const User = require("../model/UserModel");

class UserController {

    async getCurrent(req, res){
        try {
            const user = req.user;
            if(!user){
                return res.status(401).send();
            }
            const userData = await User.findById(user._id);
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

    async getPendingUsers(req, res) {
        try {
            const allPendingUsers = await User.find({ isVerified: 'pending' });
            return res.status(200).send(allPendingUsers);
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }

    async pending(req, res) {
        try {
            const user = req.user;

            const data = await User.findById(user._id);

            data.isVerified = "pending";
            await data.save();

            return res.status(200).send("Send request")
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }

    async verifyUser(req, res) {
        try {
            const userId = req.body.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send("User not found");
            }

            user.isVerified = true;
            await user.save();

            return res.status(200).send("User is verified");
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }

    async refuseUser(req, res) {
        try {
            const userId = req.body.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send("User not found");
            }

            user.isVerified = false;
            await user.save();

            return res.status(200).send("User verification declined");
        } catch (error) {
            console.log(error);
            return res.status(500).send();
        }
    }
}

module.exports = new UserController()
