const test = require('tape');
const router = require('./router');
const supertest = require('supertest');

test('Initialise', (t) => {
  let num = 2;
  t.equal(num, 2, 'Should return 2');
  t.end();
})

test('check status code is 200', (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text, 'Hello', 'response should contain \'Hello\'');
      t.end();
    });
});

// 1 
test('check status code is 404', (t) => {
  supertest(router)
    .get("/elephants")
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text, 'unknown uri', 'response should contain \'unknown uri\'');
      t.end();
    });
});

// 2
test('/blog', (t) => {
  supertest(router)
    .get("/blog")
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.body.length, 3, 'responseObject should contain an array with 3 elements');
      t.equal(typeof res.body[0], 'string', 'first element of an responseObject array should be a string');
      t.equal(typeof res.body[1], 'string', 'second element of an responseObject array should be a string');
      t.equal(typeof res.body[2], 'string', 'third element of an responseObject array should be a string');
      t.end();
    });
});

// 3
test('Blog route - post - password - payload', (t) => {
  supertest(router)
    .post("/blog")
    .send(['a', 'b'])
    .expect(200)
    .expect('Content-Type', 'application/json')
    .set({ password: 'potato' })
    .end((err, res) => {
      t.error(err)
      t.deepEqual(res.body, ['a', 'b'], 'Should return payload');
      t.end();
    });
});

test('Blog route test - post - no password header', (t) => {
  supertest(router)
    .post('/blog')
    .expect(403)
    .expect('Content-Type', /text/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text, 'Forbidden');
      t.end();
    });
});

test('Blog route - post - password - no payload', (t) => {
  supertest(router)
    .post("/blog")
    .expect(302)
    .expect('Content-Type', /json/)
    .set({ password: 'potato' })
    .end((err, res) => {
      t.error(err)
      t.equal(res.headers.location, '/blog', 'Header should include Location /blog');
      t.end();
    });
});

test('Blog route - post - wrong password - no payload', (t) => {
  supertest(router)
    .post("/blog")
    .expect(403)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.end();
    });
});
