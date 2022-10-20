const { controller } = require('../controllers/controller');
const router = require('express').Router();

//Add user register
router.post('/register', controller.saveUserRegisterData(req, res).catch(err => console.log(err)));
router.post('/login', controller.postLogin(req, res).catch(err => console.log(err)));
router.post('/user/info', controller.getUserInfo(req, res).catch(err => console.log(err)));

module.exports = router;
