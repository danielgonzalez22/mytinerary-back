const mongoose = require('mongoose')
  mongoose.connect(               //este metodo connect devuelve una promesa//
      //primer parametro: link de conexion//
      //segundo parametro: objecto con dos propiedades en true//
  process.env.MONGO_URI,         //primer parametro, definido en .env//
  {                              //segundo parametro, objeto con estas 2 propiedades en true://
      useUnifiedTopology: true,  //para controlar mongodb con mongoose
      useNewUrlParser: true      //para utilizar el analizador de errores de mongoose en lugar del de mongo
  }
)
   .then(()=>console.log('connected to database successfully')) //aviso de exito en la conexion//
   .catch(error=>console.log(error)) //ya que devuelve una promesa, se debe controlar algun error//