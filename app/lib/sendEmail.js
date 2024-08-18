//Create SendEmail function from nodemailer

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// });

// const sendEmail = (to, subject, text) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to,
//         subject,
//         text
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error occurred:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// }
const sendEmail = (to, subject, text) =>{
    console.log("Email will be sent in future", to, subject, text);
}

module.exports = sendEmail;