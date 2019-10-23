const express = require('express');
const usercontroller = require('./../controller/usercontroller');
const router = express.Router();
const authcontroller = require('./../controller/authcontroller');

router.post('/signup', authcontroller.signup);
router.post('/signin', authcontroller.signin);

router.post('/forgotpassword', authcontroller.forgotpassword);
router.post('/resetpassword/:token', authcontroller.resetpassword);

router.post('/updateme', authcontroller.protect, usercontroller.updateme);
router.delete('/deleteme', authcontroller.protect, usercontroller.deleteme);

router.patch(
  '/updatepassword',
  authcontroller.protect,
  authcontroller.updatepassword
);
router
  .route('/')
  .get(usercontroller.getusers)
  .post(usercontroller.createuser);

router
  .route('/:id')
  .get(usercontroller.getuser)
  .patch(usercontroller.updateuser)
  .delete(usercontroller.deleteuser);

module.exports = router;
