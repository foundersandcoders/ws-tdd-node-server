const test = require('tape');
const shot = require('shot');
const router = require('./router');

test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'Should return 2');
  t.end(); // Remember to call t.end() after every test call, to ensure tests run in order. You can also investigate t.plan() in the docs
})

test('Home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    t.equal(res.payload, 'Hello', 'response should contain \'Hello\'');
    t.end();
  })
})

test('/blog/:blogpost', (t) => {
  shot.inject(router, { method: 'get', url: '/blog/:blogpost' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    t.equal(res.payload, 'Works for any blogpost', 'response should contain \'blogpost\'');
    t.end();
  })
})

test('Unknown route', (t) => {
  shot.inject(router, { method: 'get', url: '/elephant' }, (res) => {
    t.equal(res.statusCode, 404, 'should respond with status code of 404');
    t.equal(res.payload, 'unknown uri', 'response should contain \'unknown uri\'');
    t.end();
  })
})

test('/blog', (t) => {
  shot.inject(router, { method: 'get', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    var responseObject = JSON.parse(res.payload);
    console.log(responseObject.length);
    t.equal(responseObject.length, 3, 'responseObject should contain an array with 3 elements');
    t.equal(typeof responseObject[0], 'string', 'first element of an responseObject array should be a string');
    t.equal(typeof responseObject[1], 'string', 'second element of an responseObject array should be a string');
    t.equal(typeof responseObject[2], 'string', 'third element of an responseObject array should be a string');
    t.end();
  })
})

test('Blog route - post - password - payload', (t) => {
  shot.inject(router, { method: 'post', url: '/blog', headers: {password: 'potato'}, payload: ['a', 'b'] }, (res) => {
    t.equal(res.statusCode, 200, 'Should return 200');
    t.deepEqual(JSON.parse(res.payload), ['a', 'b'], 'Should return payload');
    t.end();
  });
});

test('Blog route tests - post - no password header', (t) => {
  shot.inject(router, { method: 'post', url: '/blog' }, (res) => {
    t.equal(res.statusCode, 403, 'Should return 403');
    t.equal(res.payload, 'Forbidden');
    t.end();
  });
});

test('Blog route - post - password - no payload', (t) => {
  shot.inject(router, { method: 'post', url: '/blog', headers: {password: 'potato'}}, (res) => {
    t.equal(res.statusCode, 302, 'Should return 302');
    t.equal(res.headers.location, '/blog', 'Header should include Location /blog');
    t.end();
  });
});

test('Blog route - post - wrong password - no payload', (t) => {
  shot.inject(router, { method: 'post', url: '/blog', headers: {password: 'noData'}}, (res) => {
    t.equal(res.statusCode, 403, 'Should return 403');
    t.end();
  });
});
