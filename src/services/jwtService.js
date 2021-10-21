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

module.exports = { createToken };
