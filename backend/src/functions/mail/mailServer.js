const nodemailer = require('nodemailer');
const ReadHTML = require('./ReadHTML')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'modernjs683@gmail.com',
        pass: 'epitech2022'
    }
});

async function Email(mail, subject, message) {
    var mailOptions = {
        from: '"ModernJS" <modernjs683@gmail.com>',
        to: mail,
        subject: subject,
        html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(info.response)
        }
    })
};

exports.registerConfirmation =  (user, link) => {
    ReadHTML("/register.html", { user: user, link: link }, function (htmlToSend) {
        Email(user.email, "Registration Confirmation", htmlToSend);
    })
}

exports.passwordRecovery = (user, link) => {
    ReadHTML("/recoverpwd.html", { user: user, link: link }, function (htmlToSend) {
        Email(user.email, "Recover your password", htmlToSend);
    })
}

exports.loginConfirmation = (user, link) => {
    ReadHTML("/login.html", { user: user, link: link }, function (htmlToSend) {
        Email(user.email, "Login Information", htmlToSend);
    })
}

exports.chatRoomInvite = (user, chatroom) => {
    ReadHTML("/login.html", { user: user, chatroom: chatroom }, function (htmlToSend) {
        Email(user.email, "Someone invited you to a chatroom", htmlToSend);
    })
}

// registerConfirmation({ firstname: "Raphael", lastname: "Maisonnave", email: "mraphaem@gmail.com" }, "youtube.com")