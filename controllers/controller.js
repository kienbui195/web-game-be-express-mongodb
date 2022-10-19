const { UserModel } = require('../model/schemas/user.schema');
const { GameModel } = require('../model/schemas/game.schema');
const { TokenModel } = require('../model/schemas/token.schema');
const verifyEmail = require('../verify/verifyEmail');

class Controller {
	async saveUserRegisterData(req, res) {
		const data = req.body;
		const user = await UserModel.findOne({ email: data.email });
		let today = new Date();

		try {
			if (!user) {
				let otp = '';
				for (let i = 0; i < 6; i++) {
					otp += `${Math.floor(Math.random() * 11)}`;
				}
				await TokenModel.create({ email: data.email, token: otp });
				const newUser = {
					username: data.username,
					email: data.email,
					password: data.password,
					isVerified: false,
					point: 0,
					game: [],
					date_create: today,
				};
				await UserModel.create(newUser);
				verifyEmail(req, res, otp);
				res.status(200).json({ type: 'success', message: 'Thành công!' });
			} else {
				res
					.status(401)
					.json({ type: 'error', message: 'Đã tồn tại tài khoản! Hãy đăng nhập hoặc đăng kí bằng một Email khác!' });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ type: 'error', message: 'Lỗi hệ thống! ' });
		}
	}

	async verifiedEmail(req, res) {
		let data = req.body;
		let token = await TokenModel.findOne({ email: data.email });
		try {
			if (token) {
				if (data.code == token.token) {
					await UserModel.findOneAndUpdate({ email: data.email }, { isVerify: true });
					await TokenModel.findOneAndDelete({ email: data.email });
					res.status(200).json({ type: 'success', message: 'Xác thực thành công!' });
				} else {
					await UserModel.findOneAndDelete({ email: data.email });
					await TokenModel.findOneAndDelete({ email: data.email });
					res.status(401).json({ type: 'error', message: 'Mã OTP không đúng!' });
				}
			} else {
				await UserModel.findOneAndDelete({ email: data.email });
				await TokenModel.findOneAndDelete({ email: data.email });
				res.status(404).json({ type: 'error', message: 'Mã OTP hết hạn!' });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ type: 'error', message: 'Lỗi hệ thống! ' });
		}
	}

	async deleteToken(req, res) {
		const data = req.body;
		try {
			setTimeout(async () => {
				await TokenModel.findOneAndDelete({ email: data.email });
			}, 32000);
			res.status(200).json({ type: 'success', message: 'OTP sẽ bị xóa sau 30s!' });
		} catch (err) {
			console.log(err);
			res.status(500).json({ type: 'error', message: 'Lỗi hệ thống! ' });
		}
	}

	resendCode(req, res) {
		const data = req.body;
		let otp = '';
		for (let i = 0; i < 6; i++) {
			otp += `${Math.floor(Math.random() * 11)}`;
		}
		verifyEmail(req, res, otp);
		res.status(200).json({ type: 'success', message: 'Một mã xác thực đã được gửi đến tài khoản Email của bạn!' });
	}

	async postLogin(req, res) {
		const data = req.body;
		const user = await UserModel.findOne({ email: data.email });
		try {
			if (user) {
				if (data.password === user.password) {
					if (user.isVerify) {
						res.status(200).json({ type: 'success', message: 'Đăng nhập thành công!' });
					} else {
						res
							.status(403)
							.json({
								type: 'error',
								message: 'Tài khoản chưa được xác thực! Hãy xác thực để sử dụng các dịch vụ của chúng tôi!',
							});
					}
				} else {
					res.status(404).json({ type: 'error', message: 'Sai mật khẩu!' });
				}
			} else {
				res.status(404);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ type: 'error', message: 'Lỗi hệ thống!' });
		}
	}
}

const controller = new Controller();

module.exports = { controller };
