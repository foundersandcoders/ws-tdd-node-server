const test = require('tape');
const router = require('./router');
const supertest = require('supertest');

test('Initialise', (t) => {
  let num = 2;
  t.equal(num, 2, 'Should return 2');
  t.end();
})

test('Home route', (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.statusCode, 200, 'should respond with a status code of 200');
      t.equal(res.text, 'Hello', 'response should contain \'Hello\'');
      t.end();
    });
});