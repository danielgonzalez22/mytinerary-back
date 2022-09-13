require('dotenv').config()
const db = require('./config/database') //import database connection
const Comment = require('./models/Comment') //import needed models
const items = [
    {
    comment:"basta",
    user:"631e87bcfb84efd499a43128",
    itinerary:"631e860573b7d0c375e86721",
}
];
items.forEach(e => {
    Comment.create({
        comment:e.comment,
        user:e.user,
        itinerary:e.itinerary,
    })
})