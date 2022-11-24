const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const mg = require('mailgun-js')
// const mailRoute = require('./routes/mail');
const cors = require("cors");

const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

// Initialize express
const app = express();

dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/register', registerRoute);
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/logout', logoutRoute);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/checkout', stripeRoute);

app.post('/api/email', async (req, res) => {
    const { email } = req.body
    const data =  {
        from: 'John Doe <john@mg.yourdomain.com>',
        to: `${email}`,
        subject: 'Thank You For Subscribing To our Newsletter',
        html: '<p>This is a test run<p>'
    };
    // return console.log({
    //     data,
    //     email
    // });

    mailgun()
    .messages()
    .send(
        data,
        (error, body) => {
        if (error) {
            console.log(error)
            res.status(500).send({ message: "Error in sending mail" })
        } else {
            console.log(body)
            res.send({ message: "Email sent successfully" })
        }
        }
    )
});


/**
 * Listen to the connect event on mongoose.
 * Only on successfull connection will we listen to the server
*/
mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log('DB Connection Successfull');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
})
.catch(err => console.log(err))
