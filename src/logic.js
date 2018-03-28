const request = require('request');

const serverApiCall = (clientReq, clientRes) => {
  request(clientReq, (err, res, body) => {
    if (err) {
      clientRes.writeHead(404, { 'content-type': 'text/plain' });
      clientRes.end('404 error');
    } else {
      clientRes.writeHead(200, { 'content-type': 'application/json' });
      clientRes.end(body);
    }
  });
};

module.exports = serverApiCall;
