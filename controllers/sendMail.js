const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const {GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,google_USER} = process.env


const sendMail = async(mail,code) => {

    const client = new OAuth2(
        process.env.GOOGLE_ID,
        process.env.GOOGLE_SECRET,
        process.env.GOOGLE_URL
    )
    client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH
    })
    const accessToken = client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: {//transport layer security
            rejectUnauthorized: false //para evitar q bloquee el antivirus
        }
    })

    const mailOptions = {
        from: GOOGLE_USER,
        to: mail,
        subject: 'verify MyTinerary account',
        html:`
            <div>
           hola ${mail}

            </div>

        `
        // codigo HTML puro que se va a renderizar en el cuerpo del  mail
    }

    await transport.sendMail(mailOptions,(error,response) => {
        if(error) {
            console.log(error)
        }else {
            console.log('ok')
        }

    })

}

module.export = sendMail