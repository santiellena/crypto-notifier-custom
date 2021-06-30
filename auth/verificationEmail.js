const nodemailer = require('nodemailer')
const configs = require('../config')


async function createVerificationEmail(recipient, secretToken) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: configs.mail.googleEmail,
            pass: configs.mail.passwordEmail
        }
    })

    const data = {
        from: "'Kour' <kourdevelopment@gmail.com>",
        to: recipient,
        subject: "Please Verify Your email",
        html: `Hi there,
        <br/>
        Thank you fro registering
        <br/><br/>
        Please verify your email in the next link
        <br/>
        <a href="${configs.frotEnd.url}/verify/${secretToken}">${configs.frotEnd.url}/verify?secretToken=${secretToken}</a>
        <br/><br/>
        Have a pleasant day!`
    };

    const sending = await transporter.sendMail(data, (err,data) => {
            if (err) {
            console.log(err);
                return false
            }
            console.log(data);
            return true
    })

        if (sending) {
            return 'sended'
        }else{
            return 'error'
        }
}


module.exports = {createVerificationEmail}