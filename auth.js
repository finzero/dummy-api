const express = require('express');
const app = express();

function base_response(statusCode, message, data) {
  return {
    errorCode: statusCode,
    errorMessage: message,
    data: data,
  };
}

app.post('/login', (req, res) => {
  const { userId, password } = req.body;
  if (userId === undefined || password === undefined) {
    return res.status(400).json(base_response('01', 'Bad Request'));
  }

  if (userId !== 'admin' && password !== 'admin') {
    return res
      .status(400)
      .json(base_response('01', 'userId or Password Invalid'));
  }

  setTimeout(() => {
    return res.json(
      base_response('00', 'success', {
        userId: userId,
        token: Buffer.from('thisIsEncodedTokenString').toString('base64'),
        refreshToken: Buffer.from('thisIsEncodedRefreshTokenString').toString(
          'base64'
        ),
        expires: 3600,
      })
    );
  }, 2000);
});

app.post('/revoke', (req, res) => {
  return res.json(base_response('00', 'Token has been revoked'));
});

module.exports = app;
