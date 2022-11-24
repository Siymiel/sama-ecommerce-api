// const router = require('express').Router();
// const mg = require('mailgun-js')
// const dotenv = require('dotenv');
// dotenv.config();

// const mailgun = () => mg({
//     apiKey: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
//     host: "api.eu.mailgun.net"
// });

// router.post("/", async (req, res) => {
//   const { email } = req.body
//   const data =  {
//     from: 'John Doe <john@mg.yourdomain.com>',
//     to: `${email}`,
//     subject: 'Thank You For Subscribing To our Newsletter',
//     html: '<p>djdhvbhbvhcbvhcb<p>'
//   };

//   mailgun()
//   .messages()
//   .send(
//     data,
//     (error, body) => {
//       if (error) {
//         console.log(error)
//         res.status(500).send({ message: "Error in sending mail" })
//       } else {
//         console.log(body)
//         res.send({ message: "Email sent successfully" })
//       }
//     }
//   )
// });


// module.exports = router