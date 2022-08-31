require('dotenv').config()
const db = require('./config/database') //import database connection
const City = require('./models/City') //import needed models

City.create({
    city:'asdasd',
    country:'asdasd',
    photo:'asdasd',
    population:'123123',
    foundation:'234324'
})