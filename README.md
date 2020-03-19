# Test Driven Development Server with Tape and Supertest

## IMPORTANT! Do NOT clone this repo!

Repeat: DO NOT CLONE! This whole repo IS the solution to the challenge, so please read below for further instructions :wink:

## Learning Outcomes

To understand the potential of faking requests to your server for the purposes of testing responses, using the tools below:

## Tools

### Tape

[Tape](https://github.com/substack/tape) is an `npm module` used for testing server side code written in Node.js. This workshop will demonstrate using tape results piped through the [tape-spec module](https://github.com/scottcorgan/tap-spec) to [prettify the test response output](https://github.com/substack/tape#things-that-go-well-with-tape)

### Supertest

[Supertest](https://github.com/visionmedia/supertest) is used in this workshop to simulate fake server requests _without_ the need to have the server listening via a socket connection to respond to the requests. Fake requests are simply objects passed to your routes;

```javascript
test("route", t => {
  supertest(router)
    .post("/")
    .send(["a", "b"]) // to send a payload
    .set({ Headers }) //setting headers
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});
```

## Walkthrough

Throughout this workshop, it is very important that you don't copy/paste the code, but write each line yourself _and make sure you understand what you're writing_. This may seem unnecessary and slightly irritating, but if you copy/paste now, you will find yourself copy/pasting from your old repos in future. It is far better that you write it from scratch enough times for you to remember it. It's a good idea to give your partner a gentle reminder [when you're pairing too](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/general/tips-for-mentoring.md).

- Create a new directory, move into it, and then set up blank node project with a package.json

```
mkdir <<name of directory>> && cd <<name of directory>>
```

```
npm init
```

- Create a server file (not strictly necessary in this walkthrough but you might as well get the practice of doing a full set up), and enter the necessary code to get your server running;

```sh
touch server.js
```

```javascript
const http = require("http");
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 4000;

http.createServer().listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`);
});
```

Remember that [`npm start` is a default command](https://docs.npmjs.com/cli/start) that will run `node server.js` unless you specify otherwise. So, if you have called this file server.js, there is no need to write a start script yourself. Type this into your terminal now, just to make sure everything has been written correctly (N.B. if you go to localhost:4000 in your browser at this stage, it won't load as we haven't any routes yet)

```sh
npm start
```

Install tape, tap-spec and supertest as dev dependencies

```sh
npm install tape supertest tap-spec --save-dev
```

Create a file to hold your tests

```sh
touch test.js
```

Inside `test.js`, require tape and supertest;

```javascript
const test = require("tape");
const supertest = require("supertest");
```

Write a test to ensure tape is working;

```javascript
test("Initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});
```

We have to call `t.end()` at the end of every test, to ensure Tape knows there's no async code running and that it hasn't missed any assertions. You can also investigate `t.plan()` in the docs.

Edit the test script in your `package.json` file

```
"scripts": {
  "test": "node test.js | tap-spec"
}
```

This will tell Node to run our test file, then pipe the result through the `tap-spec` module, which will format it nicely for our terminal.

Run `npm test` in the terminal to check the test is passing

![test-1](./docs/test-1.png)

You're going to start by testing your routes, so create a router file

```sh
touch router.js
```

Back in `test.js`, require in your new router file

```javascript
const router = require("./router"); // remember: relative paths are needed for local modules, and if you're working with a javascript file, the '.js' extension is not required (you can still add the extension if you like)
```

Now let's create a failing test to check your `router.js` logic. Start by describing what you are testing

```javascript
// Home Route
test("Home route returns a status code of 200", t => {});
```

We have to pass Supertest our `router` function. We then define the type of request: here we are saying we want to make a `GET` request to the home route `'/'`. We are then expecting to get a response status code of `200` and a `"Content-Type"` header of `"text/plain"`. Supertest will fail our test if these aren't correct. Finally we end with a callback function that is passed any error or response for that request.

```javascript
// Home Route
test("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/plain")
    .end((err, res) => {
      // we will deal with the response here
    });
});
```

In the `.end()` callback we have access to the whole response, so we can make assertions about it.

```javascript
// Home Route
test("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/plain")
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "hello");
      t.end();
    });
});
```

`t.error()` checks that whatever it was passed is falsy. If it isn't falsy the test fails and Tape assumes it was passed an error object and shows the `.message` property in the terminal.

Here we are checking that our response didn't fail and that our response body was `"hello".

Now when you run `npm test` you should see the following error:

```
TypeError: app.address is not a function
```

This is because we are not exporting our router, which means it cannot be accessed by our test file. So let's get started on our router file.

In router.js, add a function called router, that includes arguments `req` and `res`

```javascript
const router = (req, res) => {};
```

And **export the router function**;

```javascript
module.exports = router;
```

Add an `if` branch for our home route:

```javascript
const router = (req, res) => {
  if (req.url === "/") {
  }
};
```

Set the status code and content-type header:

```javascript
const router = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
  }
};
```

Finally, send the response with `.end()`:

```javascript
const router = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("hello");
  }
};
```

Update your `server.js` file so that you are requiring in your router

```javascript
const http = require("http");
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 4000;
const router = require("./router");

http.createServer(router).listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`);
});
```

Run `npm test` again and you should see your test pass.

## Next Steps

`supertest` introduces the `expect` API, which does some of the work `tape` was doing for us (eg: we don't need to manually chcek `res.statusCode`). The [documentation](https://www.npmjs.com/package/supertest#api) indicates that we can use `expect` for testing status codes, header fields, response bodies, or to pass an arbitrary function to. Combined with [tapes testing methods](https://github.com/substack/tape) you can build a robust set of tests to ensure all your server endpoints are tested.

Extra notes on the `expect` API can be found [here](https://dzone.com/articles/testing-http-apis-with-supertest).

## Exercises

Next, find a partner that you haven't worked with before. Use TDD and the ping-pong method [that you learned in week 1](https://founders-and-coders.gitbook.io/coursebook/documents/pair-programming#methods) to test and implement the following endpoints:

| URL             | Headers                    | Body        | Status Code | Response body            | Response Headers                       |
| --------------- | -------------------------- | ----------- | ----------- | ------------------------ | -------------------------------------- |
| `GET /elephant` | N/A                        | N/A         | `404`       | `"<h1>Not Found</h1>"`   | `{ "Content-Type": "text/html"`        |
| `GET /blog`     | N/A                        | N/A         | `200`       | `["cat", "dog", "bird"]` | `{ "Content-Type": "application/json"` |
| `POST /blog`    | `{ Authorization: "123" }` | `["a","b"]` | `200`       | `["a","b"]`              | `{ "Content-Type": "application/json"` |
| `POST /blog`    | `{ Authorization: "456" }` | N/A         | `401`       | `"Unauthorized"`         | `{ "Content-Type": "text/html"`        |
| `POST /blog`    | `{ Authorization: "123" }` | N/A         | `302`       | `{ Location : "/blog" }` | `{ Location : "/blog" }`               |
