require('dotenv').config()
const db = require('./config/database') 
const User = require('./models/User') 
const items = [ 
   { name: "Lionel", 
    lastName: "Messi",
    mail: "leomessi@gmail.com",
    password: "100721",
    photo: "https://media-public.fcbarcelona.com/20157/0/document_thumbnail/20197/118/62/206/30293622/1.0-7/30293622.jpg?t=1476744328000",
    country: "Argentina",
},
{ name: "Enzo", 
    lastName: "Perez",
    mail: "enzope24@hotmail.com",
    password: "091218",
    photo: "https://www.cariverplate.com.ar/imagenes/jugadores/2022-08/1498-24-perez-imagenprincipal.png",
    country: "Argentina",
},
{ name: "Guido", 
    lastName: "Kaczka",
    mail: "guido123@gmail.com",
    password: "averlarepe",
    photo: "https://robertoramasso.com/contrataciones/guido-kaczka.png",
    country: "Argentina",
}
]
items.forEach(e => {
    User.create({
        name:e.name,
        lastName:e.lastName,
        mail:e.mail,
        password:e.password,
        photo:e.photo,
        country:e.country
    })
})