const request = require('request');

const serverApiCall = (req, response) => {
  request(req, (err, res, body) => {
    if (err) {
      response.writeHead(404, { 'content-type': 'text/plain' });
      response.end('404 error');
    } else {
      console.log(res);
      console.log(body);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify(res.request.uri.href));
    }
  });
};

module.exports = serverApiCall;
