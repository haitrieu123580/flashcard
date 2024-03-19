import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Service } from 'typedi';
dotenv.config();

@Service()
class EmailService {
    private transporter: any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.STMP_SERVICE,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS
            }
        });
    }
    sendMail = async (email: string, subject: string, content: string) => {
        let mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: content
        };
        this.transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
export default EmailService;