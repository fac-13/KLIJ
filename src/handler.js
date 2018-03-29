const fs = require('fs');
const path = require('path');
const serverApiCall = require('./logic');

require('dotenv').config();

const apiUrl = 'https://api.nasa.gov/planetary/apod?';
const key = process.env.APIKEY;

const staticHandler = (filepath, res) => {
  const extension = filepath.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
  };

  fs.readFile(path.join(__dirname, '..', filepath), 'utf8', (error, file) => {
    if (error) {
      res.writeHead(500, { 'content-type': 'text/html' });
      res.end('<h1> Sorry! There was an error.</h1>');
    } else {
      res.writeHead(200, { 'content-type': extensionType[extension] });
      res.end(file);
    }
  });
};

const photoHandler = (url, res) => {
  const date = url.split('?')[1];
  const req = `${apiUrl}date=${date}&api_key=${key}`;
  serverApiCall(req, (err, nasaRes, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'plain/test' });
      res.end('There was a problem with NASA API');
    } else {
      res.writeHead(nasaRes.statusCode, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
};

module.exports = { staticHandler, photoHandler };
