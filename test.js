const test = require('tape');
const shot = require('shot');
const router = require('./router');

// Setup
test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'Should return 2, result =' + num);
  t.end();
})

// Home Route
test('Home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    t.equal(res.payload, 'Hello', 'should return correct response');
    t.end();
  })
})

// Blog Route
test('Blog route', (t) => {
  shot.inject(router, { method: 'get', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    t.equal(res.payload, 'Blog', 'should return correct response');
    t.end();
  })
})
