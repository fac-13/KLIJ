const { staticHandler, photoHandler } = require('./handler');

const router = (req, res) => {
  const { url } = req;

  if (url === '/') {
    staticHandler('public/index.html', res);
  } else if (url.startsWith('/api/search')) {
    photoHandler(req, res);
  } else if (url.startsWith('/public')) {
    staticHandler(url, res);
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 error');
  }
};

module.exports = router;
