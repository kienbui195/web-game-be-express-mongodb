const { UserModel } = require('../model/schemas/user.schema');
const { GameModel } = require('../model/schemas/game.schema');
const { TokenModel } = require('../model/schemas/token.schema');
const verifyEmail = require('../verify/verifyEmail');
const dotenv = require('dotenv');

dotenv.config();
class Controller {
	async saveUserRegisterData(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.findOne({ email: data.email });
			let today = new Date();

			if (!user) {
				const newUser = {
					username: data.username,
					email: data.email,
					password: data.password,
					point: 0,
					game: [],
					date_create: today,
				};
				await UserModel.create(newUser);
				res.status(200).json({ type: 'success', message: 'Đăng kí thành công!' });
			} else {
				res.status(200).json({ type: 'error', message: 'Tài khoản đã tồn tại!' });
			}
		} catch (err) {
			console.log(err);
			res.status(500);
		}
	}

	async getUserInfo(req, res) {
		try {
			const user = await UserModel.findOne({ email: req.body.email });

			if (user) {
				res.status(200).json({ type: 'success', message: user });
			} else res.status(200).json({ type: 'error', message: 'Không tồn tại người dùng!' });
		} catch (err) {
			res.status(500);
		}
	}

	async postLogin(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.findOne({ email: data.email });
			if (user) {
				if (data.password === user.password) {
					res.status(200).json({
						type: 'success',
						message: 'Đăng nhập thành công!',
						token: process.env.token,
					});
				} else {
					res.status(200).json({ type: 'error', message: 'Sai mật khẩu!' });
				}
			} else {
				res.status(200),
					json({
						type: 'error',
						message: 'Không tồn tại tài khoản này!',
					});
			}
		} catch (err) {
			console.log(err);
			res.status(500);
		}
	}
}

const controller = new Controller();

module.exports = { controller };
