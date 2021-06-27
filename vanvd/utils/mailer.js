const nodeMailer = require('nodemailer');
const config = require('../config/mailer.config');

const sendMail = (to, subject, content) => {
  const transporter = nodeMailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    secure: false,
    service: 'gmail',
    auth: {
      user: config.adminEmail,
      pass: config.adminPassword
    }
  });

  const options = {
    from: config.adminEmail,
    to: to,
    subject: subject,
    text: content
  }

  transporter.sendMail(options);
}

module.exports = {
  sendMail: sendMail
}