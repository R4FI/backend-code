const express = require('express');
const userController = require('../Controllers/User.controller');
const router = express.Router();

// routes
router.route('/')
.post(userController.createUser)
.get(userController.getUser)



router.route('/:id')
.get(userController.getSingleUser)


module.exports =  router