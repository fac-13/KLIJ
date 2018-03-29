const request = require('request');

const serverApiCall = (clientReq, cb) => {
  console.log(clientReq);
  request(clientReq, (err, res, body) => {
    if (err) {
      cb(err);
    } else {
      cb(body);
    }
  });
};

module.exports = serverApiCall;
