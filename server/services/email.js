const nodemailer = require('nodemailer');

const sendOrderConfirmation = async (email, order) => {
    //Send an email to the user confirming their order
    try {
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const htmlEmail = `
        <h3>Thank you for your order!</h3>
        <p>Order ID: ${order.id}</p>
        `
        await transporter.sendMail({
            from: '"no-reply" <no-reply@stonefort.solutions>', // sender address
            to: email, // list of receivers
            subject: "Acme Store Order Comfirmation", // Subject line
            html: htmlEmail, // html body
        });
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = { sendOrderConfirmation }