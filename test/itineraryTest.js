const request = require ('supertest')
const app = require ('../app')

describe('GET /itineraries', function() {

it ('Must respond with the 200 status code', function(done){
    request(app)
    .get('/itineraries')
    .expect(201, done) 
})

it ('Must respond with the 404 status code', function(done){
    request(app)
    .get('/itinerariesMocha')
    .expect(404) 
    .end(function(err, res){
        if (err) return done (err)
        return done()

    })
});

});

describe('UPDATE /itineraries', function() {

it('Must respond with the 201 status code', function(done) {
    request(app)
        .patch('/itineraries/63213f6f0c3bf93e0a76e8e2')
        .send({  user:[
            "656565656565"
        ]})
        .expect(200, done)
})

})









































