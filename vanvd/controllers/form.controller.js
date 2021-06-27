const { form, user } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const mailer = require('../utils/mailer');

const addNewForm = async(req, res) => {
  let {
    userId,
    typeOf,
    status
  } = req.body;

  try {
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
        status
      });
      const subject = `[Annoucement] ${typeOf} form for employee`;
      const body = `You have a new ${typeOf} form, Let's finish`;
      eventEmitter.on('addNewForm', async function() {
        await mailer.sendMail(userTemp.email, subject, body);
      });
      eventEmitter.emit('addNewForm');
    }
    res.sendStatus(200);
    return;
  } catch (error) {
    console.log(error)
  }
}

const updateForm = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }

  let {
    managerId,
    note,
    task,
    achievement,
    managerComment,
  } = req.body;

  try {
    const payload = jwt.verify(token, config.secret);
    const formTemp = await form.findOne({
      where: {
        userId: payload.id
      }
    });
    if (!formTemp) {
      res.status(404).send("Have no form of this userId");
      return;
    } else {
      const manager = await user.findOne({
        where: {
          id: managerId
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
        managerComment,
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
    }

  } catch (error) {
    console.log(error)
  }
}

const getAllFormOfUser = async(req, res) => {
  const token = req.header('token');
  //check if not token in request
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const payload = jwt.verify(token, config.secret);
    const formOfuser = await form.findAll({
      where: {
        managerId: payload.id
      }
    });
    if (!formOfuser) {
      res.status(404).send("This managerId does not have any form of user");
    }
    res.status(200).send(formOfuser);
  } catch (error) {
    console.log(error);
  }
}

const approveForm = async(req, res) => {
  const id = req.params.id;
  //check if not token in request
  const token = req.header('token');
  try {
    if (!token) {
      res.send('Not Token');
      return;
    }
  } catch (err) {
    console.log(err);
  }
  const payload = jwt.verify(token, config.secret);
  try {
    const formApprove = await form.findOne({
      where: {
        id: id
      }
    });
    if (!formApprove) {
      res.status(404).send("Not found any form by this userId");
      return;
    } else {
      if (formApprove.managerId !== payload.id) {
        res.send("This form is not be long to managerId in token");
        return;
      }
      const result = await form.update({
        status: "Approved"
      }, {
        where: {
          id: id
        }
      });
      if (!result) {
        res.send("Can approve this form");
        return;
      }
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteForm = async(req, res) => {
  const id = req.params.id;
  try {
    const result = await form.destroy({
      where: {
        id: id
      }
    });
    if (!result) {
      res.send('Can not delete this account');
      return;
    } else(
      res.status(200).send("Deleted!")
    )
  } catch (error) {
    console.log(error)
  }
}

const reportFinishYearlyForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "yearly",
      status: "Approved"
    }
  });
  if (!report) {
    res.status(404).send("Can not get list finished yearly report")
  }
  res.send(report);

}

const reportFinishBasicForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "basic",
      status: "Approved"
    }
  });
  if (!report) {
    res.status(404).send("Can not get list finished basic report")
  }
  res.send(report);
}

const reportIncompleteYearlyForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "yearly",
      status: "new"
    }
  });
  if (!report) {
    res.status(404).send("Can not get list incomplete yearly report")
  }
  res.send(report);
}

const reportIncompleteBasicForm = async(req, res) => {
  const report = await form.findAll({
    where: {
      typeOf: "basic",
      status: "new"
    }
  });
  if (!report) {
    res.status(404).send("Can not get list incomplete basic report")
  }
  res.send(report);
}

module.exports = {
  addNewForm,
  updateForm,
  deleteForm,
  getAllFormOfUser,
  approveForm,
  reportFinishYearlyForm,
  reportFinishBasicForm,
  reportIncompleteYearlyForm,
  reportIncompleteBasicForm
}