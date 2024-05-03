const mongoose = require('mongoose')


const apodSchema = new mongoose.Schema({
   
    date : {
        type : String,
        required : true,
        
    }
    

})


module.exports = mongoose.model('Apod',apodSchema)