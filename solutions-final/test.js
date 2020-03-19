const test = require("tape");
const router = require("./router");
const supertest = require("supertest");

test("Initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

test("check status code is 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/plain")
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "Hello");
      t.end();
    });
});

// 1
test("check status code is 404", t => {
  supertest(router)
    .get("/elephant")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "<h1>Not Found</h1>");
      t.end();
    });
});

// 2
test("/blog", t => {
  supertest(router)
    .get("/blog")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.body.length,
        3,
        "responseObject should contain an array with 3 elements"
      );
      t.equal(
        typeof res.body[0],
        "string",
        "first element of an responseObject array should be a string"
      );
      t.equal(
        typeof res.body[1],
        "string",
        "second element of an responseObject array should be a string"
      );
      t.equal(
        typeof res.body[2],
        "string",
        "third element of an responseObject array should be a string"
      );
      t.end();
    });
});

// 3
test("Blog route - post - password - payload", t => {
  supertest(router)
    .post("/blog")
    .set({ authorization: "123" })
    .send(["a", "b"])
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      t.deepEqual(res.body, ["a", "b"], "Should return payload");
      t.end();
    });
});

test("Blog route test - post - no password header", t => {
  supertest(router)
    .post("/blog")
    .expect(401)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "<h1>Unauthorized</h1>");
      t.end();
    });
});

test("Blog route - post - password - no payload", t => {
  supertest(router)
    .post("/blog")
    .set({ authorization: "123" })
    .expect(302)
    .expect("Location", "/blog")
    .end((err, res) => {
      t.error(err);
      t.end();
    });
});
