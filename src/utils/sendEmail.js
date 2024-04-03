import nodemailer from 'nodemailer'

export const sendMail = async (email, subject, text) =>{
    try {
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            service: process.env.EMAIL_SERVICE,
            secure: Boolean(process.env.EMAIL_SECURE),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_SENHA,
            }
        })

        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        })

        console.log('email sent')
    } catch(e) {
        console.log('email error')
        console.log(e);
    }
}