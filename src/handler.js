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
  // const dummyUrl = '/api/search/1995-10-02';
  const date = url.split('?')[1];
  const req = `${apiUrl}date=${date}&api_key=${key}`;
  console.log(req);
  serverApiCall(req, (err, data) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log('data is here:', data);
      res.end(data);
    }
  });
};

module.exports = { staticHandler, photoHandler };
