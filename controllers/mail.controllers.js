const nodemailer = require("nodemailer");

const sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Send Email Failed");
      console.log(err);
    } else {
      console.log("Send Email Successfully", data);
    }
  });
};

module.exports = { sendMail };
