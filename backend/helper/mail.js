const nodemailer = require("nodemailer");
const {
  MAIL_USER,
  MAIL_PORT,
  MAIL_HOST,
  MAIL_PASS,
} = require("../config/constants");

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // True for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

/**
 * Send registration email
 */
const sendRegistrationEmail = (email, firstName, lastName) => {
  const mailOptions = {
    from: `"Student Registery" <${MAIL_USER}>`, // Sender address
    to: email, // List of receivers
    subject: "Registration Successful", // Subject line
    text: `Hello ${firstName} ${lastName},\n\nYour registration was successful.`, // Plain text body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendRegistrationEmail };
