const mailer = require('../utils/mailer');

const sendMail = async(req, res) => {
  try {
    const {
      to,
      subject,
      body,
    } = req.body;

    await mailer.sendMail(to, subject, body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  sendMail: sendMail
}