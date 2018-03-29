const test = require('tape');
const supertest = require('supertest');
const nock = require('nock');
const router = require('./router');
const serverApiCall = require('./logic');

test('Tape is working', (t) => {
  t.equal(1, 1, 'one should equal one');
  t.end();
});

test('Testing home route returns a status code of 200', (t) => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, 'Should return 200');
      t.end();
    });
});

test('Testing public route returns a status code of 200', (t) => {
  const files = {
    'style.css': 'css',
    'index.js': 'javascript',
  };
  Object.keys(files).forEach((file) => {
    supertest(router)
      .get(`/public/${file}`)
      .expect(200)
      .expect('content-type', new RegExp(`${files[file]}`))
      .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 200, 'Should return 200');
      });
  });
  t.end();
});

test('Testing random route returns a status code of 404', (t) => {
  supertest(router)
    .get('/elephant')
    .expect(404)
    .expect('content-type', /plain/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, 'Should return 404');
      t.end();
    });
});


test('Testing nock is working', (t) => {
  nock('https://api.nasa.gov/planetary/apod')
    .get('?date=2018-03-29')
    .replyWithError('There was a problem with NASA API');
  serverApiCall('https://api.nasa.gov/planetary/apod?date=2018-03-29', (err, res) =>{
    if (err) {
      t.deepEqual(err, new Error('There was a problem with NASA API'), 'Should return error');
    } else {
      console.log(res);
    }
    t.end();
  });
});

// console.log(websiteNock);

test('trying to test API call', (t) => {
  supertest(router)
    .get('/api/search/?2018-03-28')
    .expect(200)
    .end((err, res) => {
      console.log(res);
      t.error(err);
      t.equal(res.statusCode, 200, 'Testing if teapot!!!');
      t.end();
    });
});
