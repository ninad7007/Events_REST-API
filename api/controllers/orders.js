const Order = require('../models/order');
const Event = require('../models/event');
const mongoose = require('mongoose');


exports.orders_get_all = (req,res,next)=>{
    Order.find()
    .populate("event")  // for populating event ids with the data of the event.
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json(err);
    })
}

exports.orders_create_order = (req, res, next) => {
    Event.findById(req.body.eventId)
      .then(event => {
        if (!event) {
          return res.status(404).json({
            message: "Event not found"
          });
        }
        const order = new Order({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          event: req.body.eventId
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            event: result.event,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
      .populate('event')
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.status(200).json({
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
          request: {
            info: "To create a new order do",
            type: "POST",
            url: "http://localhost:3000/events",
            body: { eventId: "ID", quantity: "Number" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }