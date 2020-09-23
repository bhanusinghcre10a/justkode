const express = require('express');
const router = express.Router();
const authcontroller = require('./../controller/authcontroller');
const viewcontroller = require('./../controller/viewcontroller');
const usercontroller = require('./../controller/usercontroller');

router.get('/', viewcontroller.home);
router.get('/home', viewcontroller.home);
router.get('/login', viewcontroller.login);
router.get('/signupp', viewcontroller.signup);
router.get('/alluser', authcontroller.protect, viewcontroller.users);
router.get('/updateuser', authcontroller.protect, usercontroller.updateuser);

module.exports = router;
