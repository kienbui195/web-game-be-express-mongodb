const { UserModel } = require('../model/schemas/user.schema');
const { ManagerModel } = require('../model/schemas/manager.schema');
const dotenv = require('dotenv');

dotenv.config();

class AuthController {
	async register(req, res) {
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
					code: '',
					date_create: today,
				};
				await UserModel.create(newUser);
				return res.status(200).json({ type: 'success', message: 'Đăng kí thành công!' });
			} else {
				return res.status(200).json({ type: 'notexist', message: 'Tài khoản đã tồn tại!' });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json('Server error');
		}
	}

	async getUserInfo(req, res) {
		try {
			const user = await UserModel.findOne({ email: req.body.email });
			if (user) {
				if (user.code === req.body.code) {
					res.status(200).json({ type: 'success', message: user });
				} else res.status(200).json({ type: 'error', message: 'Bạn chưa đăng nhập!' });
			} else res.status(200).json({ type: 'notexist', message: 'Không tồn tại người dùng!' });
		} catch (err) {
			res.status(500).json('Server error');
		}
	}

	async postLogin(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.findOne({ email: data.email });
			if (user) {
				if (data.password === user.password) {
					await UserModel.findOneAndUpdate(
						{ email: data.email },
						{ code: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9hvKAVAecgfQ25SidqOrqsrdH4TCKkBa1HhhTi4zqLN0' }
					);

					let userLogin = await ManagerModel.findOne({ email: user.email });
					if (!userLogin) {
						userLogin = {
							username: user.username,
							email: user.email,
							point: user.point,
							date_create: user.date_create,
						};
						await ManagerModel.create(userLogin);
					}
					res.status(200).json({
						type: 'success',
						message: 'Đăng nhập thành công!',
						code: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9hvKAVAecgfQ25SidqOrqsrdH4TCKkBa1HhhTi4zqLN0',
					});
				} else {
					res.status(200).json({ type: 'error', message: 'Sai mật khẩu!' });
				}
			} else {
				res.status(200).json({
					type: 'notexist',
					message: 'Không tồn tại tài khoản này!',
				});
			}
		} catch (err) {
			console.log(err);
			res.status(500).json('Server error');
		}
	}

	async setPoint(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.findOne({ email: data.email });
			if (user) {
				if (user.code === data.code) {
					let pointUp = user.point + +data.point;
					await UserModel.findOneAndUpdate({ email: data.email }, { point: pointUp });
					res.status(200).json({ type: 'success', message: 'Lưu điểm thành công!' });
				} else {
					res.status(200).json({ type: 'error', message: 'Bạn chưa đăng nhập! Hãy đăng nhập để chơi game!' });
				}
			} else {
				res.status(200).json({ type: 'notexist', message: 'Tài khoản không tồn tại!' });
			}
		} catch (err) {
			res.status(500).json('Server error');
		}
	}

	async logout(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.findOne({ email: data.email });
			if (user) {
				if (user.code === data.code) {
					await UserModel.findOneAndUpdate({ email: data.email }, { code: '' });
					res.status(200).json({ type: 'success', message: 'Logout thành công!' });
				} else {
					res.status(200).json({ type: 'error', message: 'Người dùng chưa login!' });
				}
			} else {
				res.status(200).json({ type: 'notexist', message: 'Không tồn tại người dùng!' });
			}
		} catch (err) {
			res.status(500).json('Server error');
		}
	}

	async getAllInfo(req, res) {
		try {
			const list = await ManagerModel.find();
			if (list) {
				res.status(200).json({ type: 'success', message: 'Lấy data thành công!', data: `${JSON.stringify(list)}` });
			} else {
				res.status(200).json({ type: 'error', message: 'Lấy data thất bại!' });
			}
		} catch (err) {
			res.status(500).json('Server error');
		}
	}

	
}

module.exports = AuthController;
