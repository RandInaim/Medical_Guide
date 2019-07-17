const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");

test("making sure tape is working", t => {
  t.equal(1, 1, "tape is working");
  t.end();
});

test("testing for home root status code 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .end((err, res) => {
      t.equal(res.statusCode, 200, "should return 200 ");
      t.end();
    });
});

test("testing for apiHandler ", t => {
  supertest(router)
    .get("/search=Headache")
    .expect(200)
    .expect("content-Type", /json/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, "should return 200 ");
      t.deepEqual(res.body, ["Headache", "Sick headache", "Flu", "Cold"]);
      t.end();
    });
});
