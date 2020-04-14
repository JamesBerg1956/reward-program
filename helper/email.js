var nodemailer = require("nodemailer");

function sendEmail(emailUser) {
  console.log("here");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rewardprogram0@gmail.com",
      pass: "testing123!",
    },
  });

  var mailOptions = {
    from: "rewardprogram0@gmail.com",
    to: emailUser,
    subject: "Welcome to your rewards program!",
    text: "Thank you for signing up.  You are now eligible to receive rewards.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = {};
