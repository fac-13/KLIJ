const request = require('request');

const serverApiCall = (clientReq, cb) => {
  request(clientReq, (err, res, body) => {
    if (err) {
      cb(err);
    } else {
      cb(body);
    }
  });
};

module.exports = serverApiCall;
