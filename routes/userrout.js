const express = require('express');
const usercontroller = require('./../controller/usercontroller');
const router = express.Router();
const authcontroller = require('./../controller/authcontroller');

router.post('/signup', authcontroller.signup);
router.post('/signin', authcontroller.signin);

router.post('/forgotpassword', authcontroller.forgotpassword);
router.post('/resetpassword/:token', authcontroller.resetpassword);
router.get('/allusers', authcontroller.getusers);
router.get('/viewuser', authcontroller.viewuser);
router.get('/logout', authcontroller.logout);

router.post('/updateme', authcontroller.protect, usercontroller.updateme);
router.delete('/deleteme', authcontroller.protect, usercontroller.deleteme);

router.patch(
  '/updatepassword',
  authcontroller.protect,
  authcontroller.updatepassword
);

module.exports = router;
