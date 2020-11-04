


exports.list =(req, res ) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sorBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Contact.find()
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, contacts) => {
        if(err){
            return res.status(400).json({
                error: 'Contact not found'
            });
        }
        res.json(contacts);
    });



};

const formidable = require('formidable');
const _  = require('lodash');
const Contact = require('../models/contact');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.contactById = (req, res, next, id ) => {
    Contact.findById(id)
    .exec((err, contact) => {
        if(err || !contact)
        {
          
            return res.status(400).json({
                error: 'Contact not found'
            });
    
        } 
        req.contact = contact;
        next();



    })
}


exports.read =(req, res) => {
    // req.contact.photo = undefined
    return res.json(req.contact);
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
        const {name, description, phone, text} = fields

        if(!name || !description || !phone || !text ){
          
                return res.status(400).json({
                    error: 'All fields are required'
                });
        
    } 

        let contact =new Contact(fields)




        contact.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        });


    });


};
