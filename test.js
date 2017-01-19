const test = require('tape');
const shot = require('shot');
const router = require('./router');

// Setup
test('Initialise', (t) => {
  t.ok('yes');
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

// Unknown route
test('Unknown route', (t) => {
  shot.inject(router, { method: 'get', url: '/elephants' }, (res) => {
    t.equal(res.statusCode, 404, 'should respond with status code of 200');
    t.equal(res.payload, 'Unknown', 'should return correct response');
    t.end();
  })
})
