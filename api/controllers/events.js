const mongoose = require('mongoose');
const Event = require('../models/event'); 

exports.events_get_all_events = (req,res,next)=>{
    Event.find()
    .select('_id name price')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            events : docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id : doc._id,
                    request:{
                        type : "GET",
                        url : 'http://localhost:3000/events/' + doc._id

                    }
                }
            })
        };
        console.log(response);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
}


exports.events_create_event = (req,res,next)=>{
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price 
    })
    event.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message : "Created product successfully",
            createdProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request: {
                    type : 'GET',
                    url: "http://localhost:3000/events/" + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
    
}

exports.events_get_event = (req,res,next)=>{
    const  id = req.params.eventId;
    Event.findById(id)
    .exec()
    .then(doc=>{ 
        console.log(doc);
        if(doc){

            res.status(200).json(doc);
        }
        else
        res.status(404).json({message : 'No valid entry for given ID'}); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
}

exports.events_patch_event = (req,res,next)=>{
    const id = req.params.eventId;
    const updateOps = {} // for checking how many parameters we want to update for the event
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;  
    }
    // Product.update({_id:id},{$set:{ name: req.body.newName , price: req.body.newPrice }})
    Event.update({_id:id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

exports.events_delete_event = (req,res,next)=>{
    const id = req.params.eventId; 
    Event.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
 }