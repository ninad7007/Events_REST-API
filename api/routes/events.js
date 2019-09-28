const express = require ("express");
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/event'); 
const checkAuth = require('../middleware/check-auth');
const EventController = require('../controllers/events');

router.get('/', EventController.events_get_all_events);

router.post('/', checkAuth, EventController.events_create_event);

router.get('/:eventId',EventController.events_get_event);

router.patch('/:eventId',checkAuth, EventController.events_patch_event);

router.delete('/:eventId',checkAuth, EventController.events_delete_event);

module.exports = router; 