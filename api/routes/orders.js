const express = require ("express");
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Event = require('../models/event');
const checkAuth = require('../middleware/check-auth')

const OrdersController = require('../controllers/orders');

// router.get('/',checkAuth, (req,res,next)=>{
//     Order.find()
//     .populate("event")  // for populating event ids with the data of the event.
//     .exec()
//     .then(docs=>{
//         res.status(200).json(docs);
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     })
// });

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post("/",checkAuth, OrdersController.orders_create_order);

router.get("/:orderId",checkAuth, OrdersController.orders_get_order);
  
router.delete("/:orderId",checkAuth, OrdersController.orders_delete_order);

module.exports = router; 