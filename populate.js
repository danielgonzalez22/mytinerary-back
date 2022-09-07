require('dotenv').config()
const db = require('./config/database') //import database connection
const City = require('./models/City') //import needed models
const items = [
    { url: "https://c4.wallpaperflare.com/wallpaper/145/57/116/top-view-of-the-city-south-africa-cape-town-atlantic-ocean-grey-and-blue-concrete-building-wallpaper-preview.jpg", 
    title: "Cape Town",
    country:"South Africa",
    population: "4618000",
    foundation: "1652",
    description: "Cape Town is the second most populous city in South Africa, after Johannesburg, and the capital of the province and the primate city of the Western Cape. As the seat of the National Parliament, it is also the legislative capital of the country. It is part of the Cape Town Metropolitan Municipality."
},
    { url: "https://fondosmil.com/fondo/63364.jpg", 
    title: "Dubai",
    country:"United Arab Emirates",
    population: "3310000",
    foundation: "1883",
    description: "Dubai is the largest and most famous city in the United Arab Emirates, followed by Abu Dhabi, the capital of the Emirates. It is located in the Persian Gulf, between Sharjah and Abu Dhabi. Also known as the city of Dubai, it is divided by Dubai Creek, a saltwater gap that bisects the city."
},
    { url: "https://images2.alphacoders.com/925/925436.jpg", 
    title: "Istambul",
    country:"Turkey",
    population: "15460000",
    foundation: "330",
    description: "Istanbul is the largest city in Turkey and one of the largest cities in Europe. It is also the administrative capital of the Province of Istanbul, one of the 81 into which Turkey is divided."
},
    { url: "https://wallpaperaccess.com/full/1128780.jpg", 
    title: "Gizah",
    country:"Egypt",
    population: "8800000",
    foundation: "642",
    description: "The pyramids of giza are ancient structures built from stone in the shape of a pyramid, these are located in Egypt. As of November 2008, competent information sources cite around 118 or 138 as the total number of identified Egyptian pyramids."
},
    { url: "https://wallpaperaccess.com/full/256265.jpg", 
    title: "Helsinki",
    country:"Finland",
    population: "631695",
    foundation: "1550",
    description: "Helsinki. It is the capital and largest city of Finland. It is located on the southern coast of the country, on the shore of the Gulf of Finland. Helsinki is part of the Uusimaa region."
},
    { url: "https://wallpaper.dog/large/967500.jpg", 
    title: "Kyoto",
    country:"Japan",
    population: "1464000",
    foundation: "794",
    description: "Kyoto is a city located in a basin surrounded by mountains to the East, West and North. Unlike urban cities like Tokyo and Osaka, there are no towering tall buildings towering over the city."
},
    { url: "https://free4kwallpapers.com/uploads/originals/2020/01/21/carrizalillo-beach-puerto-escondido-oaxaca-mexico-oc-wallpaper.jpg", 
    title: "Oaxaca",
    country:"Mexico",
    population: "4132000",
    foundation: "1823",
    description: "Oaxaca is one of the richest States of the Mexican Republic due to its cultural diversity and its abundant natural resources. It is a magical and ancestral land that is divided into eight regions: Cañada, Costa, Isthmus, Mixteca, Papaloapan, Sierra Sur, Sierra Norte and Valles Centrales."
},
    { url: "https://media.istockphoto.com/photos/fishermen-boat-floating-in-porto-seguro-northeast-brazil-at-dramatic-picture-id1159907296?b=1&k=20&m=1159907296&s=170667a&w=0&h=SsH0WgLrPn3JuKqTSS9KxU2lEVaoEVNZTuIQLFvlhN8=", 
    title: "Porto Seguro",
    country:"Brazil",
    population: "140000",
    foundation: "1534",
    description: "Porto Seguro is a city located in the extreme south of the state of Bahia, in the Brazilian northeast. Is located almost entirely by historical heritage, the construction of tall buildings ( with more than three floors)."
},
    { url: "https://images6.alphacoders.com/547/thumb-1920-547008.jpg", 
    title: "Reykjavik",
    country:"Iceland",
    population: "122000",
    foundation: "870",
    description: "Reykjavík, which means Smoky Bay, is by far the largest city in all of Iceland. Its role as the northernmost capital on the planet means that in winter there are only four hours of light, while in summer it is permanent throughout the day. The capital was the first settlement on the island."
},
    { url: "https://besthqwallpapers.com/Uploads/22-2-2017/13825/thumb2-sydney-4k-opera-house-panorama-night.jpg", 
    title: "Sydney",
    country:"Australia",
    population: "5300000",
    foundation: "1788",
    description: "Sydney is the largest and most populous city in Australia. It is the capital of the state of New South Wales and was the seat of the first British colony in Australia."
},
    { url: "https://c4.wallpaperflare.com/wallpaper/206/498/365/the-sky-sunset-lights-river-home-hd-wallpaper-preview.jpg", 
    title: "Udaipur",
    country:"India",
    population: "451000",
    foundation: "1559",
    description: "Udaipur is a city located in northwestern India, it is the head of the Udaipur district in the federal state of Rajasthan. Udaipur was the capital of the ancient kingdom of Mewar."
},
    { url: "https://wallpaperaccess.com/full/326618.jpg", 
    title: "Venice",
    country:"Italy",
    population: "258000",
    foundation: "421",
    description: "Located in a marshy lagoon in the Adriatic Sea, between the mouths of the Po and Piave rivers, the city of Venice is made up of 120 small islands, connected to each other by hundreds of bridges, rivers and canals, some of them of great beauty."
}
];
items.forEach(e => {
    City.create({
        photo:e.url,
        city:e.title,
        country:e.country,
        population:e.population,
        foundation:e.foundation,
        description:e.description
    })
})