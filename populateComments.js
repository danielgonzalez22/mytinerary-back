require('dotenv').config()
const db = require('./config/database') //import database connection
const Comment = require('./models/Comment') //import needed models
const items = [
    {
    comment:"Incredible!!",
    user:"Mauro",
    itinerary:"631928bc6b7204400a6088d0",
}
];
items.forEach(e => {
    Comment.create({
        comment:e.comment,
        user:e.user,
        itinerary:e.itinerary,
    })
})