require('dotenv').config()
const db = require('./config/database') //import database connection
const Activities = require('./models/Activity') //import needed models
const items = [
    {
    name: "",
    photo: "",
    itinerary: "",
}
]