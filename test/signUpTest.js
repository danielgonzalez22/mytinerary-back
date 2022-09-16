const request = require('supertest')
const app = require('../app')
const { assert } = require('chai')

 describe('POST /signup', function () {

    it('Must respond with the id', function(){
        request(app)
            .post('/auth/signup')
            .send({
                name:"Guido",
                lastName:"Suller",
                mail:"sullerguido@gmail.com",
                password:"123123",
                photo:"https://cdn.eltrecetv.com.ar/sites/default/files/styles/934x525/public/2019/01/21/guidosuller.jpg",
                country:"Argentina",
                from: "form"
            })
            .then(response => {
                city = response.body.id
                assert.isString(response.body.id)
                done()
                })
    })

    it('Must respond with 200 status code', function(done){
        request(app)
            .post('/auth/signup')
            .send({
                name:"Guido",
                lastName:"Suller",
                mail:"sullerguido@gmail.com",
                password:"123123",
                photo:"https://cdn.eltrecetv.com.ar/sites/default/files/styles/934x525/public/2019/01/21/guidosuller.jpg",
                country:"Argentina",
                from: "form"
            })
            .expect(200, done)

    })

    it('Must respond with 404 status code', function(done){
        request(app)
            .post('/signup')
            .send({})
            .expect(404, done)


    })


   })


