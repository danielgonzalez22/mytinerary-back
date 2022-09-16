const request = require('supertest')
const app = require('../app')
const { deleteOne } = require('../models/User')

 describe('POST /auth/signin', function () {
    it('Must respond with the name', function(){
        request(app)
            .post('/auth/signin')
            .send({
            mail:"sullerguido@gmail.com",
            password: "123123",

            })
            .then(response => {
                city = response.body.name
                assert.isString(response.body.name)
                done()
            })
    })

    it('Must respond with 200 status code', function(done){
        request(app)
            .post('/signin')
            .send({
                mail:"sullerguido@gmail.com",
                password: "123123",
                from: 'form'
            })
            .expect(200)
            done()

    })

    it('Must respond with 404 status code', function(done){
        request(app)
            .post('/singin')
            .send({})
            .expect(404, done)

    })
     })