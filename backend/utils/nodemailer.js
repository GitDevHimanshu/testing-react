const nodemailer = require("nodemailer");

module.exports.sendMail = async( email, name, ) => {
    try {

        let transporter = await nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "geetahunny@gmail.com",
                pass: "lphz xhtc knyp ozkk",
            }
        })

       let info = await transporter.sendMail({
        from: {
            name: "Helpme",
            address: "geetahunny@gmail.com",
        },
        to: email,
        subject: "thankyou for contacting us",
        html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Thank You for Contacting Us</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and one of our representatives will be in touch with you shortly.</p>
            <p>If you have any urgent concerns, please do not hesitate to contact us directly at <a href="tel:[9817717588]">[9817717588]</a>.</p>
            <p>Best regards,</p>
            <p>himanshu<br>
            director<br>
            helpme pvt ltd<br></p>
        </body>
        </html>
        `,
       }) 
       return 1   
    } catch (error) {
        return 0
    }
}