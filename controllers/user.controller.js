const { UserModel } = require('../model/schemas/user.schema');
const dotenv = require('dotenv');


dotenv.config();

class UserController {
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

module.exports = UserController