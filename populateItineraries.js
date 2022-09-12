require('dotenv').config()
const db = require('./config/database') //import database connection
const Itinerary = require('./models/Itinerary') //import needed models
const items = [
    {
        name: "Zafari for the jungle",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f0",
        price: "100",
        likes: "10",
        tags: "#animals #funny",
        duration: "4"
    },
    {
        name: "Airplane",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f0",
        price: "150",
        likes: "24",
        tags: "#fly #adrenalin",
        duration: "2"
    },
    {
        name: "Swim with sharks",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f0",
        price: "50",
        likes: "4",
        tags: "#risky #exciting",
        duration: "1"
    },
    {
        name: "Visit the top of the Burj Khalifa",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f1",
        price: "300",
        likes: "34",
        tags: "#luxury",
        duration: "2"
    },
    {
        name: "Sheikhs Party ",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f1",
        price: "50",
        likes: "120",
        tags: "#party #night",
        duration: "4"
    },
    {
        name: "Know an oil well",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f1",
        price: "20",
        likes: "2",
        tags: "#curious #dubai",
        duration: "3"
    },
    {
        name: "Watch a soccer game",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f2",
        price: "50",
        likes: "54",
        tags: "#soccer #galatasaray",
        duration: "2"
    },
    {
        name: "Meet a film set",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f2",
        price: "10",
        likes: "5",
        tags: "#film #novels",
        duration: "1"
    },
    {
        name: "Tour around the city",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f2",
        price: "20",
        likes: "45",
        tags: "#tour #freshair",
        duration: "3"
    },
    {
        name: "Tour of the pyramids",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f3",
        price: "80",
        likes: "36",
        tags: "#history #egypt",
        duration: "5"
    },
    {
        name: "Visit the tomb of Tutanchamon",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f3",
        price: "60",
        likes: "20",
        tags: "#god",
        duration: "1"
    },
    {
        name: "Outdoor Museum",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f4",
        price: "50",
        likes: "19",
        tags: "#museum #finland",
        duration: "4"
    },
    {
        name: "Tour of the city",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f4",
        price: "50",
        likes: "39",
        tags: "#tour #cars",
        duration: "3"
    },
    {
        name: "Visit the mountains",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f5",
        price: "60",
        likes: "98",
        tags: "#cold #funny",
        duration: "2"
    },
    {
        name: "Meet the golden pavilion",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f5",
        price: "100",
        likes: "54",
        tags: "#culture #japon",
        duration: "3"
    },
    {
        name: "Day of the Dead",
        user: "6318f2cf86ea60a969d24e47",
        city: "631e852ccc9e4d60318d56f6",
        price: "30",
        likes: "34",
        tags: "#festival #mexico",
        duration: "6"
    },
    {
        name: "Porto Seguro Carnival",
        user: "6318f2cf86ea60a969d24e48",
        city: "631e852ccc9e4d60318d56f7",
        price: "35",
        likes: "66",
        tags: "#brazil #carnival",
        duration: "5"
    },
    {
        name: "Attend a concert at the Sydney opera house",
        user: "6318f2cf86ea60a969d24e49",
        city: "631e852ccc9e4d60318d56f9",
        price: "80",
        likes: "56",
        tags: "#opera #music",
        duration: "3"
    },
]
items.forEach(e => {
    Itinerary.create({
        name:e.name,
        user:e.user,
        city:e.city,
        price:e.price,
        likes:e.likes,
        tags:e.tags,
        duration:e.duration,
    })
})