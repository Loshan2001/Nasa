const mongoose = require('mongoose')


const roverSchema = new mongoose.Schema({
    
    date : {
        type : String,
        required : true,
        
    }
    

})


module.exports = mongoose.model('Rover',roverSchema)