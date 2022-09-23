const User = require('../models/User')
const crypto = require('crypto')
const bcryptjs = require('bcryptjs');
const sendMail = require('./sendMail')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const validator = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z ]+$/).min(3).max(15).required(),
    lastName: Joi.string().pattern(/^[a-zA-Z ]+$/).min(3).max(15).required(),
    mail: Joi.alternatives().try(Joi.string()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ar", "org"] } }),
    )
        .required().error(new Error("Invalid mail")),
    photo: Joi.string().uri().required(),
    country: Joi.string().min(4).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string().min(3).max(15).required(),
    from: Joi.string().min(3).max(15).required()
})

const userController = {
    signUp: async (req, res) => {
        console.log(req.body)
        let {
            name,
            lastName,
            photo,
            country,
            mail,
            password,
            role, // el rol debe venir desde el front para usar este metodo en ambos casos (user y admin)
            from // el from debe venir desde el frotn para avisar al metodo desde donde se crea el usuario ej: google,facebook,etc
        } = req.body
        try {
            let user = await validator.validateAsync(req.body) // me guardo todo dentro de validator y le pido que valide req.body
            await User.findOne({ mail })
            console.log(user)
            if (!user) {
                let loggedIn = false;
                let verified = false;
                let code = crypto
                    .randomBytes(15) // le aplico el metodo para avisar que debe tener 15 digitos 
                    .toString('hex') // le aplico el metodo para avisar que debe ser hexagecimal
                console.log(code)
                if (from === 'form') { //from form, si la data viene de del formulario de registro    
                    password = bcryptjs.hashSync(password, 10);

                    user = await new User({ name, lastName, photo, country, mail, password: [password], role, from: [from], loggedIn, verified, code }).save()
                    //aaca hace falta enviar mail de verificacion   
                    sendMail(mail, code)
                    res.status(201).json({
                        message: "User signed.",
                        success: true,
                    })
                } else { // si la data viene desde cualquier red social voy a hacer otra cosa
                    password = bcryptjs.hashSync(password, 10); // este metodo requiere 2 parametros, primero la contraseña que debe hashear y segundo parametro, el nivel de seguridad que requiere el hasheo (10)
                    verified = true,
                        user = await new User({
                            name, lastName, photo, country, mail, password: [password], role,
                            //aca no hace falta mail de verificacion    
                            from: [from], loggedIn, verified, code
                        }).save()
                    res.status(201).json({
                        message: "User signed from " + from, // de esta forma avisara cual es el medio desde el que se registro el usuario
                        success: true,
                    })
                }
            } else {
                if (user.from.includes(from)) { // si la propiedad from del usuario (que es un array)incluye from esa forma de registro 
                    res.status(200).json({
                        message: "User already exists.",
                        success: false
                    })
                } else {
                    user.from.push(from); // si no incluye esa forma de registro se la agrego
                    user.verified = true;
                    password = bcryptjs.hashSync(password, 10)
                    user.password.push(password)
                    await user.save()
                    res.status(201).json({
                        message: "User signed up from " + from,
                        success: true
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "could't signed up",
                success: false
            })
        }
    },
    // el codigo generado por el metodo de signup se envia a este otro metodo a traves de params para poder verificar la cuenta
    // luego de crearlo lo comparo con los demas perfiles ya creados 
    // si encuentra el usuario cambiara el verified de false a true
    // si no lo encuentra (caso raro) avisara que el mail a verificar no tiene cuenta    
    verifyMail: async (req, res) => {
        const { code } = req.params
        try {
            let user = await User.findOne({ code })
            if (user) {
                user.verified = true // aqui se cambia la propiedad 
                await user.save() // y acaa se guarda en la database
                res.status("200").redirect(301, 'https://mytinerary-front-cgs.herokuapp.com/')

            } else {
                res.status("404").json({
                    message: "This mail does not belong to an account.",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    signIn: async (req, res) => {
        const { mail, password, from } = req.body
        try {
            const user = await User.findOne({ mail })
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User does not exist, please sign up"
                })
            } else if (user.verified) {
                const checkPass = user.password.filter(passwordElement => bcryptjs.compareSync(password, passwordElement))
                if (from === 'form') {
                    if (checkPass.length > 0) {
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            mail: user.mail,
                            role: user.role,
                            from: user.from,
                            photo: user.photo
                        }

                        user.loggedIn = true
                        await user.save()

                        res.status(200).json({
                            success: true,
                            response: { user: loginUser },
                            message: "Welcome " + user.name
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Wrong username or password."
                        })
                    }
                } else {
                    if (checkPass.length > 0) {
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            mail: user.mail,
                            role: user.role,
                            from: user.from,
                            photo: user.photo
                        }

                        user.loggedIn = true
                        await user.save()

                        res.status(200).json({
                            success: true,
                            response: { user: loginUser },
                            message: "Welcome " + user.name
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Invalid credentials."
                        })
                    }
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "Please, verify your mail account and try again."
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: "Error signing in."
            })
        }
    },
    signOut: async (req, res) => {
        const { mail } = req.body
        try {
            let user = await User.findOne({ mail: mail })
            if (user) {
                user.loggedIn = false
                await user.save()
                res.status(200).json({
                    message: 'Your session has been closed successfully',
                    success: true,
                    response: user.loggedIn
                })
            } else {
                res.status(404).json({
                    message: 'User not found.',
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Failed to sign out.',
                success: false
            })
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params
        try {
            let user = await User.findOne({ _id: id })
                .populate('itineraries', { name: 1, city: 1 })
            if (user) {
                res.status("200").json({
                    message: "Found.",
                    response: user,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Coud not be found.",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    getUsers: async (req, res) => {
        let users
        let query = {}
        if (req.query.users) {
            query.users = req.query.users
        }
        try {
            users = await User.find(query)
            if (users) {
                res.status("200").json({
                    message: "Users found!",
                    response: users,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "No users could be found.",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                success: false,
            })
        }
    },
    modifyUser: async (req, res)=>{
        const {mail} = req.body
        const {mail: uMail, role:userRole} = req.user
        try {
            console.log(mail)
            if (uMail.toString() === mail || userRole === "admin") {
                let putUser = await User.findOne({ mail: mail })
                if (putUser) {
                        let {
                            name,
                            lastname,
                            photo,
                            country,
                            role
                        } = req.body;
                    if (userRole !== "admin") {
                            putUser = await User.findOneAndUpdate(
                            { mail:mail }, {name,lastname,photo,country}, { new: true })
                                res.status("200").json({
                                    message: "User updated.",
                                    response: putUser,
                                    success: true,
                            })
                    } else if(userRole === "admin") {
                            putUser = await User.findOneAndUpdate(
                            { mail:mail }, {name,lastname,photo,country,role}, { new: true })
                            res.status("200").json({
                                message: "User updated.",
                                response: putUser,
                                success: true,
                            })
                    } else{
                        res.status("404").json({
                            message: "This User does not exist.",
                            success: false,
                        })
                    }
            } else {
                res.status("401").json({
                    message: "Unahutorized",
                    success: false,
                })
            }
        }}catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    removeUser: async (req, res) => {
        const { id } = req.params
        try {
            await User.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "You deleted an User.",
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    verifyToken: (req, res) => {
        if (req.user !== null){
            res.status(200).json({
                success:true,
                response:{
                    user: {
                        id: req.user._id,
                        name: req.user.name,
                        mail: req.user.mail,
                        role: req.user.role,
                        photo:req.user.photo
                    }
                },
                message: 'Welcome' + req.user.name+'!'
            })
        }else {
            res.json({
                success:false,
                message: "Sign in please"
            })
        }
        }
}

module.exports = userController;