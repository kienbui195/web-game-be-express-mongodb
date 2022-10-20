const { controller } = require('../controllers/controller');
const router = require('express').Router();

//Add user register
router.post('/register', controller.saveUserRegisterData);
router.post('/login', controller.postLogin);
router.post('/user/info', controller.getUserInfo);

module.exports = router;
