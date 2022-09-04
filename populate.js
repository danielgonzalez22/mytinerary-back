require('dotenv').config()
const db = require('./config/database') //import database connection
const City = require('./models/City') //import needed models
const items = [
    { url: "/img/cities/ciudad-del-cabo.jpg", 
    title: "Cape Town",
    country:"South Africa",
    population: "4618000",
    foundation: "1652"
},
    { url: "/img/cities/dubai.jpg", 
    title: "Dubai",
    country:"United Arab Emirates",
    population: "3310000",
    foundation: "1883"
},
    { url: "/img/cities/estambul.jpg", 
    title: "Istambul",
    country:"Turkey",
    population: "15460000",
    foundation: "330"
},
    { url: "/img/cities/guiza.jpg", 
    title: "Gizah",
    country:"Egypt",
    population: "8800000",
    foundation: "642"
},
    { url: "/img/cities/helsinki.jpg", 
    title: "Helsinki",
    country:"Finland",
    population: "631695",
    foundation: "1550"
},
    { url: "/img/cities/kyoto.jpg", 
    title: "Kyoto",
    country:"Japan",
    population: "1464000",
    foundation: "794"
},
    { url: "/img/cities/oaxaca.jpg", 
    title: "Oaxaca",
    country:"Mexico",
    population: "4132000",
    foundation: "1823"
},
    { url: "/img/cities/porto.jpg", 
    title: "Porto",
    country:"Brazil",
    population: "140000",
    foundation: "1534"
},
    { url: "/img/cities/reykjavik.jpg", 
    title: "Reykjavik",
    country:"Iceland",
    population: "122000",
    foundation: "870"
},
    { url: "/img/cities/sidney.jpg", 
    title: "Sidney",
    country:"Australia",
    population: "5300000",
    foundation: "1788" 
},
    { url: "/img/cities/udaipur.jpg", 
    title: "Udaipur",
    country:"India",
    population: "451000",
    foundation: "1559" 
},
    { url: "/img/cities/venecia.jpg", 
    title: "Venice",
    country:"Italy",
    population: "258000",
    foundation: "421" 
}
];
items.forEach(e => {
    City.create({
        photo:e.url,
        city:e.title,
        country:e.country,
        population:e.population,
        foundation:e.foundation
    })
})