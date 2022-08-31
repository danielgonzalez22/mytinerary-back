const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //todas las propiedades necesarias//
    city:{type: String, required: true},
    country:{type: String, required: true},
    photo:{type: String, required: true},
    population:{type: Number, required: true}, //entero, min 1000 max 100 millones
    foundation:{type: Date, required: true}, //solo el año AAAA
   })
 const City = mongoose.model(
     //primer parámetro: nombre de la colección
     //segundo parámetro: esquema de datos
  'cities',
   schema
 )

 module.exports = City