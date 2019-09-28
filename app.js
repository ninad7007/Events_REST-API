const express = require("express");
const app = express();
const morgan = require('morgan'); //logging pakage for node.js (keeps log of our erquests and responses)
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');


const eventRoutes = require('./api/routes/events');
const orderRoutes = require('./api/routes/orders');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://node-api:'+ process.env.MONGO_ATLAS_PW + '@node-api-ticketing-jc2zl.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true
 });

app.use(morgan('dev')); // morgan will make use of the 'next' function parameter passed to our callback function
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handle CORS error
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); //* stands for any client. 
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Authorization'); 
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods' , 'PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use("/user", userRoutes);
app.use('/events', eventRoutes);
app.use('/orders', orderRoutes);

app.use((req,res,next)=>{
     const error = new Error('Not found');
     error.status=404;
     next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;