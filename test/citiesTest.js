const request = require("supertest");
const app = require("../app");
const { assert } = require("chai");
let cityId = ""
describe("POST /cities", function () {
  it("Must respond with to 201", function (done) {
    request(app)
      .post("/cities")
      .send({
        "city": "Dubai",
        "country": "United Arab Emirates",
        "photo": "http://localhost:400/image",
        "population": 3310000,
        "foundation": 1883,
      })
      
      .then((response) => {
        cityId= response.body.response
        assert.isString(response.body.response)
       done()
      })
      
  });
});
describe("DELETE /cities", function () {
  it("Must respond with 200 status code", function (done) {
    request(app)
      .delete(`/cities/${cityId}`)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /cities", function () {
  it("Must respond with 200 status code", function (done) {
    request(app)
      .get("/cities")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
