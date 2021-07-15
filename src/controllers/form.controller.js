const { form, user } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const mailer = require('../utils/mailer');
const FORM_EMUM = require('../const/form.enum');

//create new form, and send mail to userId in each form
const addNewForm = async(req, res) => {
  const token = req.header('token');
  let {
    userId,
    typeOf,
  } = req.body;

  try {
    //check if not token in request
    if (!token) {
      res.send('Not Token');
      return;
    }
    const payload = jwt.verify(token, config.secret);
    const Employees = await user.findAll({
      where: {
        id: userId,
        isDelete: 0
      }
    });
    let listEmail = [];
    let listEmployees = [];
    Employees.forEach(e => {
      listEmployees.push({
          userId: e.id,
          typeOf: typeOf,
          status: FORM_EMUM.STATUS.NEW,
          createBy: payload.id,
          updateBy: payload.id,
          isDelete: 0
        }),
        listEmail.push(e.email);
    })
    const newForm = await form.bulkCreate(listEmployees);
    if (!newForm) {
      res.send("Can not add new form");
      return;
    }
    //send email to employee
    const subject = `[Annoucement] ${typeOf} form for employee`;
    const body = `You have a new ${typeOf} form, Let's finish`;
    eventEmitter.on('addNewForm', async function() {
      await mailer.sendMail(listEmail, subject, body);
    });
    eventEmitter.emit('addNewForm');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
      status: FORM_EMUM.STATUS.PENDING_APPROVE
    }, {
      where: {
        userId: payload.id,
        isDelete: 0
      }
    });
    if (!result[0]) {
      res.send("Can not update this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
        if (formPersonal.length) {
          result["personal"] = formPersonal;
        }

        const formEmployee = await form.findAll({
          where: {
            managerId: payload.id,
            isDelete: 0
          }
        });
        if (formEmployee.length) {
          result["employee"] = formEmployee;
        }
      } else {
        if ((req.role[x] === 'hr') || (req.role[x] === 'admin')) {
          const allForm = await form.findAll({
            where: {
              isDelete: 0
            }
          });
          if (allForm.length) {
            result["all"] = allForm;
          }
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
      res.send("Can not get form");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
      res.status(403).send("Permission deny");
      return;
    }
    res.status(200).send(formTemp);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//manager approve form of employee
const approveForm = async(req, res) => {
  const id = req.params.id;
  let { managerComment } = req.body;
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
      status: FORM_EMUM.STATUS.APPROVED
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!result[0]) {
      res.send("Can approve this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//hr close form after manager approved
const closeForm = async(req, res) => {
  const id = req.params.id;
  try {
    const formClosed = await form.update({
      status: FORM_EMUM.STATUS.CLOSED
    }, {
      where: {
        id: id,
        isDelete: 0
      }
    });
    if (!formClosed[0]) {
      res.send("Can not close this form");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
    if (!result[0]) {
      res.send('Can not delete this account');
      return;
    }
    res.status(200).send("Deleted!")
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all form
const getAllForm = async(req, res) => {
  const pageNum = req.query.currentPage;
  const size = req.query.pageSize;

  try {
    const result = await form.findAll({
      limit: parseInt(size),
      offset: (parseInt(pageNum) - 1) * parseInt(size),
    });
    if (!result.length) {
      res.status(404).send("Can not get all form");
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all finish yearly form 
const reportFinishYearlyForm = async(req, res) => {
  try {
    const report = await form.findAll({
      where: {
        typeOf: "yearly",
        status: FORM_EMUM.STATUS.CLOSED,
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
    res.status(200).send({
      number: result.length,
      userId: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//gegt all finish basic form
const reportFinishBasicForm = async(req, res) => {
  try {
    const report = await form.findAll({
      where: {
        typeOf: "basic",
        status: FORM_EMUM.STATUS.CLOSED,
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
    res.status(200).send({
      number: result.length,
      userId: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all imcomplete yearly form
const reportIncompleteYearlyForm = async(req, res) => {
  try {
    const report = await form.findAll({
      where: {
        typeOf: "yearly",
        status: FORM_EMUM.STATUS.NEW,
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
    res.status(200).send({
      number: result.length,
      userId: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

//get all incomplete basic form
const reportIncompleteBasicForm = async(req, res) => {
  try {
    const report = await form.findAll({
      where: {
        typeOf: "basic",
        status: FORM_EMUM.STATUS.NEW,
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
    res.status(200).send({
      number: result.length,
      userId: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
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
  getAllForm,
  reportFinishYearlyForm,
  reportFinishBasicForm,
  reportIncompleteYearlyForm,
  reportIncompleteBasicForm,
}