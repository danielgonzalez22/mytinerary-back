const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    city:{type: String, required: true},
    country:{type: String, required: true},
    photo:{type: String, required: true},
    population:{type: Number, min:1000, max:100000000, required: true},
    foundation:{type: Date, transform: v => v.getFullYear(), required: true},
    description:{type: String, required: true}
   })
 const City = mongoose.model(
  'cities',
   schema
 )

 module.exports = City