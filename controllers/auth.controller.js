const { UserModel } = require('../model/schemas/user.schema');
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
					token: '',
					game: [],
					date_create: today,
				};
				await UserModel.create(newUser);
				return res.status(200).json({ type: 'success', message: 'Đăng kí thành công!' });
			} else {
				return res.status(200).json({ type: 'error', message: 'Tài khoản đã tồn tại!' });
			}
		} catch (err) {
			console.log(err);
			return res.status(500);
		}
	}

	async getUserInfo(req, res) {
		try {
			const user = await UserModel.findOne({ email: req.body.email });
			if (user) {
				if (user.token.length > 0) {
					res.status(200).json({ type: 'success', message: user });
				} else res.status(200).json({ type: 'error', message: 'Bạn chưa đăng nhập!' });
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
					await UserModel.findOneAndUpdate({ email: data.email }, { token: process.env.token });
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


	async setPoint(req, res) {
        const data = req.body
        const user = await UserModel.findOne({ email: data.email })
        if (user) {
            if (user.token.length > 0) {
                await UserModel.findOneAndUpdate({ email: data.email }, { point: user.point + data.point })
                res.status(200).json({type: 'success', message: 'Lưu điểm thành công!'})
            } else {
                res.status(200).json({type: 'error', message: 'Bạn chưa đăng nhập! Hãy đăng nhập để chơi game!'})
            }
        } else {
            res.status(200).json({type: 'error', message: 'Tài khoản không tồn tại!'})
        }
    }
}

module.exports = AuthController;
