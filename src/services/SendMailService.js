var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  // Đây là bước cấu hình
  //service: 'gmail',
  host: process.env.GMAIL_HOST,
  port: process.env.GMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.GMAIL_SENDER_TK,
    pass: process.env.GMAIL_SENDER_PASS,
  },
});
function SendMailVetify(toMail, sub, text, html) {
  var mailOptions = {
    // đây là bước gửi mail
    from: process.env.GMAIL_SENDER_TK,
    to: toMail,
    subject: sub,
    text: text,
    html: html,
  };
  console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Lỗi trong khi gửi email');
    } else {
      console.log('Gửi email thành công');
    }
  });
}

module.exports = {
  SendMailVetify,
};
