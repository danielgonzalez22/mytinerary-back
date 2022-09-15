require('dotenv').config()
const db = require('./config/database') //import database connection
const Comment = require('./models/Comment') //import needed models
const items = [
    {
    comment:"basta",
    user:"631e87bcfb84efd499a43128",
    itinerary:"631f8ed7ce170ef8e60bda46",
}
];
items.forEach(e => {
    Comment.create({
        comment:e.comment,
        user:e.user,
        itinerary:e.itinerary,
    })
})