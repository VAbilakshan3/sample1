const formidable = require('formidable');
const _  = require('lodash');
const Service = require('../models/service');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
// const { resolveSoa } = require('dns');
// const category = require('../models/category')
// const service = require('../models/service');

exports.serviceById = (req, res, next, id ) => {
    Service.findById(id)
    .populate('category')
    .exec((err, service) => {
        if(err || !service)
        {
          
            return res.status(400).json({
                error: 'Service not found'
            });
    
        } 
        req.service = service;
        next();



    })
}


exports.read =(req, res) => {
    req.service.photo = undefined
    return res.json(req.service);
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
        const {name, description, price, category, quantity} = fields

        if(!name || !description || !price || !category || !quantity){
          
                return res.status(400).json({
                    error: 'All fields are required'
                });
        
    } 

        let service =new Service(fields)


// 1kb = 1000
// 1mb = 1000000




        if(files.photo) {
            // console.log('FILES PHOTO: ', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            service.photo.data = fs.readFileSync(files.photo.path);
            service.photo.contentType = files.photo.type;
        }
        service.save((err, result) => {
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
    let service = req.service 
    service.remove((err, deletedService) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedService,
            "message": 'Service deleted successfully'
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
        const {name, description, price, category, quantity} = fields

        if(!name || !description || !price || !category || !quantity){
          
                return res.status(400).json({
                    error: 'All fields are required'
                });
        
    } 

        let service = req.service;
        service = _.extend(service, fields);


// 1kb = 1000
// 1mb = 1000000




        if(files.photo) {
            // console.log('FILES PHOTO: ', files.photo);
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            service.photo.data = fs.readFileSync(files.photo.path);
            service.photo.contentType = files.photo.type;
        }
        service.save((err, result) => {
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
 * sell / arrival
 * by sell = /services?sortBy = sold&order=asc&limit=4
 * by arrival = /services?sortBy = createdAt&order=desc&limit=4
 * if no params are sent, then all services are returned
 */



exports.list =(req, res ) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sorBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Service.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, services) => {
        if(err){
            return res.status(400).json({
                error: 'Service not found'
            });
        }
        res.json(services);
    });



};


/**
 *  it will find the services based on the req service category
 * other services that has the same category, will be returned
 */





exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    
    Service.find({_id: {$ne: req.service}, category: req.service.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, services) => {
        if(err) {
            return res.status(400).json({
                error: "Service not found"
            });
        }
        res.json(services)
    });
};





exports.listCategories = (req, res) => {
    Service.distinct("category", { }, (err, categories) => {
        if(err) {
        return res.status(400).json({
            error: "Categories not found"
        });
    }
    res.json(categories)

    });

};





/**
 * list services by search
 * we will implement service search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the services to users based on what he wants
 */


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Service.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Services not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo = (req, res, next) => {
    if(req.service.photo.data) {
        res.set("Content-Type", req.service.photo.contentType);
        return res.send(req.service.photo.data);

    }
    next()
};




exports.listSearch = (req, res) => {
    // create query object to hold serach value and category value
    const query = {}
    // assign search value to query.name
    if(req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        // assigne category value to query.category
        if(req.query.category && req.query.category != "All") {
            query.category = req.query.category
        }
        // find the service based on query object with 2 properties 
        // search and category
        Service.find(query, (err, services) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(services)
        }).select("-photo")
    }
}


exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.services.map(item => {
        return {
            updateOne: {
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count, sold: +item.count }}
            }
        };
    });

    Service.bulkWrite(bulkOps, {}, (error, services) => {
        if(error) {
            return res.status(400).json({
                error: 'Could not update service'
            })
        }
        next();
    })
}




