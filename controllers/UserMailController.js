const User = require('../models/User')
const crypto = require('crypto') //recurso propio de nodeJS para generar códigos aleatorios y unicos
const bcryptjs = require('bcryptjs') //recurso propio de nodeJS para hashear contraseñas
const sendMail = require('./sendMail')

const userMailController = {

    signUp: async(req,res) => {
        let {
            name,
            photo,
            email,
            pass,
            role, //el rol tiene que venir desde el frontend para usar este metodo para ambos casos (user y admin)
            from //el from tiene que venir desde el frontend para avisarle al método desde donde se crea el usuario
        } = req.body
        try {
            let user = await User.findOne({email})
            if (!user) {
                let logged = false
                let verified = false
                let code = crypto //invoco el generador de codigos
                    .randomBytes(15) //le aplico el método para avisarle que tiene que tener 15 digitos
                    .toString('hex') //le aplico el método para avisarle que tiene que ser hexagecimal
                //code: clave unica de usuario o unique string
                if (from==='form') {//si la data viene del formulario de registro
                    pass = bcryptjs.hashSync(pass,10) //utilizamos el método hashSync que requiere dos parametros
                    user = await new User({name,photo,email,pass:[pass],role,from:[from],logged,verified,code}).save() //modifico pass con el array
                    sendMail(email,code)
                    res.status(201).json({
                        message: "user signed up from form",
                        success: true           
                    })
                } else { //si viene desde redes sociales (cualquier red social)
                    pass = bcryptjs.hashSync(pass,10) //utilizamos el método hashSync que requiere dos parametros
                    verified = true
                    user = await new User({name,photo,email,pass:[pass],role,from:[from],logged,verified,code}).save()
                    //no hace falta enviar el mail de verificacion
                    res.status(201).json({
                        message: "user signed up from "+from,
                        success: true
                    })
                }
            } else { //si el usuario SI existe
                if (user.from.includes(from)) { //si la propiedad from del usuario (que es un array) incluye el valor de from ===> user.from = ['google','facebook'] incluye from='google'
                    res.status(200).json({ //200 a confirmar/estudiar => tiene exito buscando un usuario
                        message: "user already exists",
                        success: false //porque no tiene exito en la creacion del usuario
                    })
                } else { // ===> user.from = ['google','facebook'] incluye from='linkedin'
                    user.from.push(from) //vinculo la nueva forma de registro al usuario encontrado pusheando el from adentro del array
                    // ===> user.from = ['google','facebook','linkedin']
                    user.verified = true //si el usuario ya tiene registro previos, significa que ya se verificó en algún momento
                    //si ya se verificó en algún momento ==> me aseguro que esté verificado definiendo user.verified=true
                    pass = bcryptjs.hashSync(pass,10) //hasheo la nueva contraseña del usuario
                    user.pass.push(pass) //y la pusheo al array de contraseñas
                    await user.save() //finalizo guardando los cambios del usuario
                    res.status(201).json({
                        message: "user signed up from "+from,
                        success: true
                    })
                }
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: "could't signed up",
                success: false
            })
        }
    },

    //el codigo unico y aleatorio generado en el metodo de signup
    //se pasa por params a este otro metodo para poder verificar la cuenta
    //luego de requerirlo lo comparo con los perfiles ya creados (lo busco en la base de datos)
        //si encuentra el usuario cambio el verified de false a true
        //si no lo encuentra avisar que el mail a verificar no tiene cuenta
    verifyMail: async(req,res) => {
        const {code} = req.params
        //let user = await User.findOne({code:code})
        try {
            let user = await User.findOne({code})
            if (user) {
                user.verified = true //cambio la propiedad
                await user.save() //guardo el cambio en la base de datos
                res.redirect('https://www.google.com') //aqui se coloca el link de redireccionamiento
                //puede redireccionar hacia index/login o hacia una pagina nueva de bienvenida al usuario nuevo
                //NO OLVIDAR HOSTEAR EL FRONT PARA QUE FUNCIONE EL REDIRECCIONAMIENTO
            } else {
                res.status(404).json({
                    message: "email has not account yet",
                    success: false
                })
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: "could't verify account",
                success: false
            })
        }
    },
    
    signIn: async(req, res) => {
    const {email, password, from} = req.body

    try{
        const user = await User.findOne({email})

        if(!user)
            res.status(404).json({
                success: false,
                message: "User doesn´s exist , please sign up"


            })
            else if(user.verified) {

            }

    }catch(error) {
        console.log(error)
    } 




},
    signOut: async() => {} //findOneAndUpdate y cambiar logged de true a false

}

module.exports = userMailController

