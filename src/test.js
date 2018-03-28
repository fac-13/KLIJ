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
