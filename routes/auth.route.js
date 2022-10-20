const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

//Add user register

let authController = new AuthController()

router.post('/register', (req, res) => {
    authController.register(req, res).catch(() => res.status(500).json('server error'))
});


module.exports = router
