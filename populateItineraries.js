require('dotenv').config()
const db = require('./config/database') //import database connection
const Itinerary = require('./models/Itinerary') //import needed models
const items = [
    {
        name: "Zafari for the jungle",
        user: "Lionel Messi",
        city: "Cape Town",
        price: "100",
        likes: "10",
        tags: "#animals #funny",
        duration: "4"
    },
    {
        name: "Airplane",
        user: "Enzo Perez",
        city: "Cape Town",
        price: "150",
        likes: "24",
        tags: "#fly #adrenalin",
        duration: "2"
    },
    {
        name: "Swim with sharks",
        user: "Enzo Perez",
        city: "Cape Town",
        price: "50",
        likes: "4",
        tags: "#risky #exciting",
        duration: "1"
    },
    {
        name: "Visit the top of the Burj Khalifa",
        user: "Lionel Mesii",
        city: "Dubai",
        price: "300",
        likes: "34",
        tags: "#luxury",
        duration: "2"
    },
    {
        name: "Sheikhs Party ",
        user: "Guido Kaczka",
        city: "Dubai",
        price: "50",
        likes: "120",
        tags: "#party #night",
        duration: "4"
    },
    {
        name: "Know an oil well",
        user: "Enzo Perez",
        city: "Dubai",
        price: "20",
        likes: "2",
        tags: "#curious #dubai",
        duration: "3"
    },
    {
        name: "Watch a soccer game",
        user: "Lionel Messi",
        city: "Istambul",
        price: "50",
        likes: "54",
        tags: "#soccer #galatasaray",
        duration: "2"
    },
    {
        name: "Meet a film set",
        user: "Guido Kaczka",
        city: "Istambul",
        price: "10",
        likes: "5",
        tags: "#film #novels",
        duration: "1"
    },
    {
        name: "Tour for the city",
        user: "Guido Kaczka",
        city: "Istambul",
        price: "20",
        likes: "45",
        tags: "#tour #freshair",
        duration: "3"
    },
    {
        name: "Tour of the pyramids",
        user: "Lionel Messi",
        city: "Gizah",
        price: "80",
        likes: "36",
        tags: "#history #egipt",
        duration: "5"
    },
    {
        name: "Visit the tomb of Tutanchamon",
        user: "Enzo Perez",
        city: "Gizah",
        price: "60",
        likes: "20",
        tags: "#god",
        duration: "1"
    },
    {
        name: "Outdoor Museum",
        user: "Guido Kaczka",
        city: "Helsinki",
        price: "50",
        likes: "19",
        tags: "#museum #finland",
        duration: "4"
    },
    {
        name: "Tour of the city",
        user: "Guido Kaczka",
        city: "Helsinki",
        price: "50",
        likes: "39",
        tags: "#tour #cars",
        duration: "3"
    },
    {
        name: "Visit the mountains",
        user: "Enzo Perez",
        city: "Kyoto",
        price: "60",
        likes: "98",
        tags: "#cold #funny",
        duration: "2"
    },
    {
        name: "Meet the golden pavilion",
        user: "Lionel Messi",
        city: "Kyoto",
        price: "100",
        likes: "54",
        tags: "#culture #japon",
        duration: "3"
    },
    {
        name: "Day of the Dead",
        user: "Lionel Messi",
        city: "Oaxaca",
        price: "30",
        likes: "34",
        tags: "#festival #mexico",
        duration: "6"
    },
    {
        name: "Porto Seguro Carnival",
        user: "Enzo Perez",
        city: "Porto Seguro",
        price: "35",
        likes: "66",
        tags: "#brazil #carnival",
        duration: "5"
    },
    {
        name: "Attend a concert at the Sydney opera house",
        user: "Guido Kaczka",
        city: "Sydney",
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