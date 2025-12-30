const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                port: 587,
                secure: false,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                connectionTimeout: 10000, // 10 sec
                greetingTimeout: 10000,
                socketTimeout: 10000,
            })


            let info = await transporter.sendMail({
                from: 'StudyBuddy || CodeWithMe',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
        //changed to comment    console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
        return null;
    }
}


module.exports = mailSender;
