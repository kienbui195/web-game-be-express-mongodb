const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

//Add user register

let authController = new AuthController();

router.post('/register', (req, res) => {
	authController.register(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/login', (req, res) => {
	authController.postLogin(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/user/info', (req, res) => {
	authController.getUserInfo(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/setpoint', (req, res) => {
	authController.setPoint(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/logout', (req, res) => {
	authController.logout(req, res).catch(() => res.status(500).json('server error'));
});

router.get('/getAllUser', (req, res) => {
	authController.getAllInfo(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/sendUser', (req, res) => {
	authController.dataGameUser(req, res).catch(() => res.status(500).json('server error'));
});

router.get('/getUser', (req, res) => {
	authController.getDataUser(req, res).catch(() => res.status(500).json('server error'));
});

router.post('/clearUser', (req, res) => {
	authController.clearUser(req, res).catch(() => res.status(500).json('server error'));
});

module.exports = router;
