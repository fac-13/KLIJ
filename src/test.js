const test = require('tape');
const supertest = require('supertest');
const router = require('./router');

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
