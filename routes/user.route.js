const UserController = require('../controllers/user.controller');

const userRouter = require('express').Router();

//Add user register

let userController = new UserController()

userRouter.post('/set-point', (req, res) => {
    userController.setPoint(req, res).catch(() => res.status(500).json('server error'))
});



module.exports = userRouter
