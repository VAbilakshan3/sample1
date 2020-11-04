const formidable = require('formidable');
const _  = require('lodash');
const Detail = require('../models/detail');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.detailById = (req, res, next, id ) => {
    Detail.findById(id)
    .populate('category')
    .exec((err, detail) => {
        if(err || !detail)
        {
          
            return res.status(400).json({
                error: 'Detail not found'
            });
    
        } 
        req.detail = detail;
        next();



    })
}


exports.read =(req, res) => {
    req.detail.photo = undefined
    return res.json(req.detail);
}



exports.create = (req , res ) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });

        }
        // check for all fields
        const {name, description, phone, category, quantity} = fields

        if(!name || !description || !phone || !category || !quantity){
          
                return res.status(400).json({
                    error: 'All fields are required'
                });
        
    } 

        let detail =new Detail(fields)


// 1kb = 1000
// 1mb = 1000000




        if(files.photo) {
            // console.log('FILES PHOTO: ', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            detail.photo.data = fs.readFileSync(files.photo.path);
            detail.photo.contentType = files.photo.type;
        }
        detail.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        });


    });


};

exports.remove = (req, res) =>{
    let detail = req.detail 
    detail.remove((err, deletedDetail) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedDetail,
            "message": 'Detail deleted successfully'
        });
    });
};




exports.update = (req , res ) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });

        }
        // check for all fields
        const {name, description, phone, category, quantity} = fields

        if(!name || !description || !phone || !category || !quantity){
          
                return res.status(400).json({
                    error: 'All fields are required'
                });
        
    } 

        let detail = req.detail;
        detail = _.extend(detail, fields);


// 1kb = 1000
// 1mb = 1000000




        if(files.photo) {
            // console.log('FILES PHOTO: ', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            detail.photo.data = fs.readFileSync(files.photo.path);
            detail.photo.contentType = files.photo.type;
        }
        detail.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        });


    });


};



/**
 * arrival
 * by arrival = /details?sortBy = createdAt&order=desc&limit=12
 * 
 */



exports.list =(req, res ) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sorBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Detail.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, details) => {
        if(err){
            return res.status(400).json({
                error: 'Detail not found'
            });
        }
        res.json(details);
    });



};



exports.photo = (req, res, next) => {
    if(req.detail.photo.data) {
        res.set("Content-Type", req.detail.photo.contentType);
        return res.send(req.detail.photo.data);

    }
    next()
};



// exports.getStatusValues = (req, res) => {
//     res.json(DetailChecked.schema.path('status').enumValues);
// };


// exports.updateDetailStatus = (req, res) => {
//     DetailChecked.update(
//         { _id: req.body.detailId },
//         { $set: { status: req.body.status }},
//         (err, detail) => {
//             if(err) {
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 });
//             }
//             res.json(detail);
//         }
//     );
// };