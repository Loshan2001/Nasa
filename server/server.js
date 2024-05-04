const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express()
const cors = require('cors')
const auth = require('./routes/auth')
import path from 'path'
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true})
const con = mongoose.connection 
con.on('open',()=>{
    console.log('mongoDB connected.....')
})
const _dirname = path.resolve()
//middleware
app.use(express.json())
app.use(cors(
    // {
    //     origin: 'http://example.com', // Specify the allowed origin(s) here
    //      methods: 'GET,PUT,POST,DELETE', // Specify the allowed HTTP methods
    //      credentials: true
    // }
))
app.use(cookieParser());
//user route middleware 
app.use('/api/user',auth)
app.use(express.static(path.join(_dirname,'/nasa_app/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'nasa_app','dist','index.html'))
})
app.listen(8080,()=>{
    console.log("server running on port 8080.....")
})


