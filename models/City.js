const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //todas las propiedades necesarias//
    city:{type: String, required: true},
    country:{type: String, required: true},
    photo:{type: String, required: true},
    population:{type: Number, min:1000, max:100000000, required: true},
    foundation:{type: Date, required: true}
   })
 const City = mongoose.model(
     //primer parámetro: nombre de la colección
     //segundo parámetro: esquema de datos
  'cities',
   schema
 )

 module.exports = City