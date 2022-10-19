const nodemailer = require('nodemailer')

let verifyEmail = (req, res, otp) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "tktclothershopc0522i1@gmail.com",
            pass: "kmyumpncamivculs",
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    let content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Mã xác thực của bạn</h4>
            <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;">${otp}</div>
        </div>
        </div> 
    `;

    let mainOptions = {
        from: '395 Group',
        to: `${req.body.email}`,
        subject: 'Xác thực Tài khoản',
        text: '',
        html: content
    }

    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({messageVerify: 'Một mã xác thực đã được gửi đến Mail của bạn!'})
        }
    })
};

module.exports =  verifyEmail;