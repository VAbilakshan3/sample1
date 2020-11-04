const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema

const contactSchema = new mongoose.Schema({
    name:{
        type: String ,
        trim: true , 
        required: true,
        maxlength: 32
    },
    description:{
        type: String ,
        required: true,
        maxlength: 2000
    },
    text:{
        type: String ,
        trim: true , 
        required: true,
        
    },
    phone: {
        type:Number,
        trim: true,
        required: true,
        minlength: 10
    },   
},
 {timestamps: true}
);


module.exports = mongoose.model ("Contact", contactSchema);




















