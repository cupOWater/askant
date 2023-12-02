const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {

    async register(req, res) {
        try {
            const { userName, email, password } = req.body;
            if (!userName && !email && !password) {
                return res.status(400).send({ msg: "Missing arguments" });
            }
            const userExist = await User.exists({ email: email });
            if (userExist) {
                return res.status(409).send({ msg: "Email already exist" })
            }
            const salt = await bcrypt.genSalt(10)
            const encryptPwd = await bcrypt.hash(password, salt)
            const user = await User.create({
                userName: userName,
                email: email,
                password: encryptPwd
            })

            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );
            user.token = token;

            res.status(201).send(user);
        } catch (err) {
            console.log(err);
        }
    }

    async login(req, res) {
        try{
            const {email, password} = req.body;
            if(!email || !password){
                res.status(400).send({msg: "Missing arguments"})
            }

            const user = await User.findOne({ email });
            if( user && (await bcrypt.compare(password, user.password))){
                const token = jwt.sign(
                    {   _id: user._id, 
                        email: user.email, 
                        userName: user.userName, 
                        isVerified: user.isVerified,
                        type: user.type},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }
                );
                user.token = token;
                
                return res.status(200).send(user)
            }
            res.status(400).send({msg: "Invalid Credential"})
        }catch (err){
            console.log(err);
        }
    }
}

module.exports = new UserController()
