const User = require("../model/UserModel");

class UserController {

    async getCurrent(req, res){
        try {
            const user = req.user;
            if(!user){
                return res.status(401).send();
            }
            const userData = await User.findById(user.user_id);
            const data = {
                _id: userData._id,
                userName: userData.userName,
                email: userData.email,
                type: userData.type,
                isVerified: userData.isVerified
            }
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }
}

module.exports = new UserController()
