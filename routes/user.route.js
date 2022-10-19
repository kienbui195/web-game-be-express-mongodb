const { controller } = require('../controllers/controller');
const router = require('express').Router();

//Add user register
router.post('/register', controller.saveUserRegisterData);
router.post('/register/verify', controller.verifiedEmail);
router.post('/register/verify/delete-token', controller.deleteToken);
router.post('/register/verify/resend', controller.resendCode);
router.post('/login', controller.postLogin);

module.exports = router;
