const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const detailSchema = new mongoose.Schema({
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
    phone: {
        type:Number,
        trim: true,
        required: true,
        minlength: 10
    },
    category: {

        type: ObjectId,
        ref: 'Category',
        required: true

    },
    quantity: {
        type: Number,
    },
    // status: {
    //     type: String,
    //     default: "Not Checked",
    //     enum: ["Not processed", "Checked"] // enum means string objects
    //   },
    photo:{
        data: Buffer,
        contentType: String
    },



   
},
 {timestamps: true}
);

module.exports = mongoose.model ("Detail", detailSchema);






// const Detail = mongoose.model("Detail", detailSchema);


// const detailCheckedSchema = new mongoose.Schema({
//     name:{
//         type: String ,
//         trim: true , 
//         required: true,
//         maxlength: 32
//     },
//     description:{
//         type: String ,
//         required: true,
//         maxlength: 2000
//     },
//     phone: {
//         type:Number,
//         trim: true,
//         required: true,
//         minlength: 10
//     },
//     category: {

//         type: ObjectId,
//         ref: 'Category',
//         required: true

//     },
//     quantity: {
//         type: Number,
//     },
//     status: {
//         type: String,
//         default: "Not Checked",
//         enum: ["Not processed", "Checked"] // enum means string objects
//       },
//     photo:{
//         data: Buffer,
//         contentType: String
//     },



   
// },
//  {timestamps: true}
// );
// const DetailChecked = mongoose.model("DetailChecked", detailCheckedSchema);

// // module.exports = mongoose.model ("Detail", detailSchema);

// module.exports = { Detail, DetailChecked };

















































// const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema

// const detailSchema = new mongoose.Schema({
//     name:{
//         type: String ,
//         trim: true , 
//         required: true,
//         maxlength: 32
//     },
//     description:{
//         type: String ,
//         required: true,
//         maxlength: 2000
//     },
//     phone: {
//         type:Number,
//         trim: true,
//         required: true,
//         minlength: 10
//     },
//     category: {

//         type: ObjectId,
//         ref: 'Category',
//         required: true

//     },
//     quantity: {
//         type: Number,
//     },
//     // status: {
//     //     type: String,
//     //     default: "Not Checked",
//     //     enum: ["Not processed", "Checked"] // enum means string objects
//     //   },
//     photo:{
//         data: Buffer,
//         contentType: String
//     },



   
// },
//  {timestamps: true}
// );