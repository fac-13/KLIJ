const staticHandler = require('./handler');

const router = (req, response) => {
  const { url } = req;

  if (url === '/') {
    staticHandler(response, 'public/index.html');
  } else if (url === '/dailyphoto') {
    photoHandler(response, url);
  } else if (url === '/userphoto') {
    photoHandler(response, url);
  } else if (url.indexOf('public') !== -1) {
    staticHandler(response, url);
  } else {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end('404 error');
  }
};

module.exports = router;
