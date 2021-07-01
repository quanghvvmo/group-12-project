const { form, user, userRole, rolePermission, role } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const mailer = require('../utils/mailer');

//create new form, and send mail to userId in each form
const addNewForm = async(req, res) => {
  const token = req.header('token');
  let {
    userId,
    typeOf,
    status
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    //userId in request body is a array
    //use a for loop to get all userId
    for (let x in userId) {
      const userTemp = await user.findOne({
        where: {
          id: userId[x]
        }
      });
      if (!userTemp) {
        res.status(404).send(`UserId ${userId[x]} is not exist`);
        return;
      }
      const newForm = await form.create({
        userId: userId[x],
        typeOf,
        status,
        createBy: payload.id,
        updateBy: payload.id,
        isDelete: 0
      });
      //send email to employee
      const subject = `[Annoucement] ${typeOf} form for employee`;
      const body = `You have a new ${typeOf} form, Let's finish`;
      eventEmitter.on('addNewForm', async function() {
        await mailer.sendMail(userTemp.email, subject, body);
      });
      eventEmitter.emit('addNewForm');
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

//employee submit form
const submitForm = async(req, res) => {
  const token = req.header('token');
  let {
    managerId,
    note,
    task,
    achievement,
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const formTemp = await form.findOne({
      where: {
        userId: payload.id,
        isDelete: 0
      }
    });
    if (!formTemp) {
      res.status(404).send("Have no form of this userId");
      return;
    }
    const manager = await user.findOne({
      where: {
        id: managerId,
        isDelete: 0
      }
    });
    if (!manager) {
      res.status(404).send("ManagerId is not exist");
      return;
    }

    const result = await form.update({
      managerId,
      note,
      task,
      achievement,
      status: "Pending approve"
    }, {
      where: {
        userId: payload.id
      }
    });
    if (!result) {
      res.send("Can not update this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

//get all form of user, 
//if user is a manager, get all form of his employee
const getFormOfUser = async(req, res) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    let result = {};
    const payload = jwt.verify(token, config.secret); //decode token to get userId
    for (let x in req.role) {
      if ((req.role[x] === 'manager') || (req.role[x] === 'director')) {
        const formPersonal = await form.findAll({
          where: {
            id: payload.id,
            isDelete: 0
          }
        });
        result["personal"] = formPersonal;

        const formEmployee = await form.findAll({
          where: {
            managerId: payload.id,
            isDelete: 0
          }
        });
        result["employee"] = formEmployee;
      } else {
        if ((req.role[x] === 'hr') || (req.role[x] === 'admin')) {
          const allForm = await form.findAll({
            where: {
              isDelete: 0
            }
          });
          result["all"] = allForm;
        } else {
          const formOfuser = await form.findAll({
            where: {
              userId: payload.id,
              isDelete: 0
            }
          });
          if (!formOfuser) {
            res.status(404).send("This userId does not have any form");
          }
          result["personal"] = formOfuser;
        }
      }
    }
    if (!result) {
      res.send("Can not get fomr");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}

const getFormById = async(req, res) => {
  const id = req.params.id;
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const formTemp = await form.findOne({
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!formTemp) {
      res.send("Form is not exist");
    }
    let check = false;
    for (let x in req.role) {
      if ((req.role[x] === 'hr') || (req.role[x] === 'admin')) {
        check = true;
      }
      if ((req.role[x] === 'manager') || (req.role[x] == 'director')) {
        if (formTemp.managerId === payload.id) {
          check = true;
        }
      }
      if (req.role[x] === 'employee') {
        if (formTemp.userId === payload.id) {
          check = true;
        }
      }
    }
    if (!check) {
      res.send("Permission deny");
      return;
    }
    res.status(200).send(formTemp);
  } catch (error) {
    console.log(error)
  }
}

//manager approve form of employee
const approveForm = async(req, res) => {
  const id = req.params.id;
  const { managerComment } = req.body;
  const token = req.header('token');
  const payload = jwt.verify(token, config.secret);
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const formApprove = await form.findOne({
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!formApprove) {
      res.status(404).send("Not found any form by this userId");
      return;
    }
    if (formApprove.managerId !== payload.id) {
      res.send("This form is not be long to managerId in token");
      return;
    }
    const result = await form.update({
      managerComment,
      status: "Approved"
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!result) {
      res.send("Can approve this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
  }
}

//hr close form after manager approved
const closeForm = async(req, res) => {
  const id = req.params.id;
  try {
    const formClosed = form.update({
      status: "closed"
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!formClosed) {
      res.send("Can not close this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
}

//delete form by id
const deleteForm = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await form.update({
      isDelete: 1
    }, {
      where: {
        id: id
      }
    });
    if (!result) {
      res.send('Can not delete this account');
      return;
    }
    res.status(200).send("Deleted!")
  } catch (error) {
    console.log(error)
  }
}

//get all finished yearly form 
const reportFinishYearlyForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "yearly",
      status: "Approved",
      isDelete: 0
    }
  });
  if (!report) {
    res.status(404).send("Can not get list finished yearly report")
  }
  let result = [];
  for (let x in report) {
    result.push(report[x].userId);
  }
  res.send({
    number: result.length,
    userId: result
  });

}

const reportFinishBasicForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "basic",
      status: "Approved",
      isDelete: 0
    }
  });
  if (!report) {
    res.status(404).send("Can not get list finished basic report")
  }
  let result = [];
  for (let x in report) {
    result.push(report[x].userId);
  }
  res.send({
    number: result.length,
    userId: result
  });
}

const reportIncompleteYearlyForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "yearly",
      status: "new",
      isDelete: 0
    }
  });
  if (!report) {
    res.status(404).send("Can not get list incomplete yearly report")
  }
  let result = [];
  for (let x in report) {
    result.push(report[x].userId);
  }
  res.send({
    number: result.length,
    userId: result
  });
}

const reportIncompleteBasicForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "basic",
      status: "new",
      isDelete: 0
    }
  });
  if (!report) {
    res.status(404).send("Can not get list incomplete basic report")
  }
  let result = [];
  for (let x in report) {
    result.push(report[x].userId);
  }
  res.send({
    number: result.length,
    userId: result
  });
}

//test get role
const getRoleById = async(req, res) => {
  const token = req.header('token');
  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret); //decode token to get user id
    const roleCheck = await userRole.findAll({
      where: {
        userId: payload.id,
        isDelete: 0
      },

      include: {
        model: role,
        include: {
          model: rolePermission,
        },
      },

    });
    res.send(roleCheck);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addNewForm,
  submitForm,
  deleteForm,
  getFormOfUser,
  getFormById,
  approveForm,
  closeForm,
  reportFinishYearlyForm,
  reportFinishBasicForm,
  reportIncompleteYearlyForm,
  reportIncompleteBasicForm,
  getRoleById
}