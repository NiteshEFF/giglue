/**
 * Created by niteshkumar on 04/03/17.
 */
let mailer=require('nodemailer');
class Mail
{
    constructor(req,res,body)
    {
    this.req=req;
    this.res=res;
    this.body=body;
    this.run();
    }
    transporter()
    {
    return mailer.createTransport({
        service: 'gmail',
        auth: {
                user:"contact@giglue.com",
                clientId: '872983078403-6u68tim1esovodv7of1phc05jcdtj3uh.apps.googleusercontent.com',
                clientSecret: 'bHfYZDiwtf3TE_CaE3P2UXVU',
                 type: 'OAuth2',
                 refreshToken: 'refreshtoken',
                 accessToken: 'accesstoken',
                 expires: 12345
        }
    });
    }
    run()
    {
        let task= this.Iterator();
        let send = task.next();
        task.next(send.value);
    }
    *Iterator()
    {
        let first=yield this.transporter();
        yield this.mail(first);
    }
    mail(transporter)
    {
        let mailOptions = {
            from: 'From '+this.body['name']+ '<'+this.body['email']+'>', // sender address
            to: 'contact@giglue.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ?', // plain text body
            html: '<b>Hello world ?</b>' // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                this.res.end();
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            this.res.end();
        });
    }
}
module.exports=Mail;
