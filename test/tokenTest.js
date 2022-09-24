const request = require("supertest")
const app = require("../app.js")
const { assert } = require("chai")
let token
describe("POST /auth/signin", () => {

  it("Must respond with user signed in", (done) => {
    request(app)
      .post('/auth/signin')
      .send({
        email: "kavellid63@gmail.com",
        password: "123456789",
        from: "form"
      })
      .expect(200)
      .then((res) => {
        console.log(res.body.message)
        token = res.body.response.token
        done()
      })
  })
})
describe("PATCH /itineraries/:id", () => {

  it("Must respond with You have updated an itinerary.", (done) => {
    request(app)
      .patch('/itineraries/63213f6f0c3bf93e0a76e8e2')
      .send({
        name: "Swim with sharks",
        price: 50,
      })
      //.set({ "Authorization": "Bearer " + token })
      .expect(200)
      .then((res) => {
        assert.isObject(res.body.response)
        done()
      })
  })
})

describe("GET /itineraries/", () => {

  it("Must respond with The following itineraries were found.", (done) => {
    request(app)
      .get('/itineraries/')
      //.set({ "Authorization": "Bearer " + token })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

describe("GET /itineraries/", () => {

  it("Must respond with The following itineraries were found.", (done) => {
    request(app)
      .get('/itineraries/')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})