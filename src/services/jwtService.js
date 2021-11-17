require('dotenv').config();
const jwt = require('jsonwebtoken');
const serectKey = process.env.ACCESS_TOKEN_SERECT;
console.log(serectKey);

function createToken(data) {
  return jwt.sign(
    {
      data: data,
      iss: 'gai xuong rong',
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    serectKey,
  );
}

async function verify(req, res, next) {
  try {
    const header = req.headers.authorization;
    //headers
    /*
          authorization
          content
      */
    let token = '';
    if (header) {
      token = header.split(' ')[1];
      console.log('tokenService token : ' + token);
      jwt.verify(token, serectKey, (err, decodedFromToken) => {
        if (err) {
          console.log('err');
          res.json({
            data: {
              tokenVerificationData: {
                access: false,
                message: 'Lỗi khi xác thực token',
              },
            },
          });
          return;
        } else {
          const idUser = decodedFromToken.data;
          if (!req.value) req.value = {};
          if (!req.value.body) req.value.body = {};
          req.value = { body: { token: decodedFromToken } };
          next();
        }
      });
    } else {
      req.value = { body: { token } };
      next();
    }
  } catch (err) {
    console.log(err);
    return res.json({
      data: {
        tokenVerificationData: {
          access: false,
          message: 'Lỗi khi xác thực token',
        },
      },
    });
  }
}

module.exports = { createToken, verify };
