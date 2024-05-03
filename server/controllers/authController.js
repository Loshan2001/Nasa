const User = require('../models/User')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const Apod = require('../models/Apod')
const Mars = require('../models/Rover')
const cookieParser = require('cookie-parser');

dotenv.config()
const { registerValidation, loginValidation } = require('../validations/userValidation')
// const { date } = require('@hapi/joi')

const userValidation = {
    registerUser: async (req, res) => {
        //lets validate the data before register a user
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        //checking if the user is already in the database 
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) return res.json({error : 'Email already exists'})

        //hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)



        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword

        })
        try {

            const savedUsers = await user.save()
            res.send(savedUsers)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    loginUser: async (req, res) => {
        // Validate the data before login as a user
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Checking if the user is already in the database 
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({error : 'Email is not found'});

        // Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.json({error : 'Invalid password'});


        //create and assign a tokken 
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        // Set token in a cookie////////////////////////////////////////////////////////////////////////////////
        res.cookie('authtoken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 60 * 1000), // Set expiry time to 10 minutes from now
        });

        // res.header('auth-token',token)
       // res.send("Success! You are logged in");
       res.json(token)
    },
    logoutUser: async (req, res) => {
        // Clear the authentication token cookie
        res.clearCookie('authtoken');
    
        // Redirect the user to the login page or send a response indicating successful logout
        res.send("You are logged out");
    },
    getAPOD : async(req,res)=>{
         

        const apod = new Apod({
            date : req.body.date
        })

         
        try{
            const apodsaved = await apod.save()
            res.send(apodsaved)
        
        }catch(err){
            res.status(400).send(err)
        }
    },
    getRover : async(req,res)=>{
        const rover = new Mars({
            date: req.body.date 
        })

        try{
            const roversaved = await rover.save()
            res.send(roversaved)
        
        }catch(err){
            res.status(400).send(err)
        }
    } 
    
}

module.exports = userValidation