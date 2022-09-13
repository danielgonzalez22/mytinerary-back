require('dotenv').config()
const db = require('./config/database') //import database connection
const Activity = require('./models/Activity') //import needed models
const items = [
    {
    name: "do something in sheiks party",
    photo: "https://pbs.twimg.com/media/DWQ5-OjWkAAtzYI.jpg:large",
    itinerary: "631f8ed7ce170ef8e60bda46",
}
]
items.forEach(e => {
    Activity.create({
        name:e.name,
        photo:e.photo,
        itinerary:e.itinerary,
    })
})