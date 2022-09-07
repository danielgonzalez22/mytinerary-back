const request = require('supertest')
const app = require('../app')
const { deleteOne } = require('../models/City')



describe('POST /events', function () {
    it('Must respond with 201 status code', function (done) {
        request(app)
            .post('/cities')
            .send({
                city: "Rome",
                country: "Italy",
                photo: "http://localhost:400/image",
                population: 2500,
                foundation: 1810-05-01,
                description: "muchtext"
            })
        
            .expect(201, done )// exitoso
          
    })

    it('Must respond with 400 status code', function (done) {
        request (app)//
            .post('/cities')
            .send({})
            .expect(400)
            .end(function(err, res ) {
                if (err) return done(err);
                return done();

            })
            .expect(400, done )
    })

    describe('GET /cities', function () {


    })
















})








