const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const aTokenExp = 60 * 15;
const rTokenExp = "24h";

class AuthController {
    async register(req, res) {
        try {
            const { userName, email, password } = req.body;
            if (!userName && !email && !password) {
                return res.status(400).send("Missing arguments");
            }
            const userExist = await User.exists({ email: email });
            if (userExist) {
                return res.status(409).send("Email already exist")
            }
            const salt = await bcrypt.genSalt(10)
            const encryptPwd = await bcrypt.hash(password, salt)
            const user = await User.create({
                userName: userName,
                email: email,
                password: encryptPwd
            })

            const refreshToken = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                    isVerified: user.isVerified,
                    type: user.type
                },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: rTokenExp
                }
            );
            const accessToken = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                    isVerified: user.isVerified,
                    type: user.type
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: aTokenExp
                }
            );
            res.cookie("rToken", refreshToken, { httpOnly: true });

            const resUser = {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                isVerified: user.isVerified,
                type: user.type
            }

            res.status(201).send({ user: resUser, accessToken: accessToken });
        } catch (err) {
            console.log(err);
            res.status(500).send()
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).send("Missing arguments")
            }

            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const refreshToken = jwt.sign(
                    {
                        user_id: user._id,
                        email: user.email,
                        isVerified: user.isVerified,
                        type: user.type
                    },
                    process.env.REFRESH_TOKEN_KEY,
                    {
                        expiresIn: rTokenExp
                    }
                );
                const accessToken = jwt.sign(
                    {
                        user_id: user._id,
                        email: user.email,
                        isVerified: user.isVerified,
                        type: user.type
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: aTokenExp
                    }
                );
                res.cookie("rToken", refreshToken, { httpOnly: true });

                const resUser = {
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    isVerified: user.isVerified,
                    type: user.type
                }

                return res.status(200).send({ user: resUser, accessToken: accessToken });
            }
            res.status(400).send("Invalid Credential")
        } catch (err) {
            console.log(err);
            res.status(500).send()
        }
    }

    async refreshToken(req, res) {
        const { rToken } = req.cookies;
        if (!rToken) {
            return res.status(403).send("Missing token")
        }

        try {
            const user = jwt.verify(rToken, process.env.REFRESH_TOKEN_KEY);
            const accessToken = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email,
                    isVerified: user.isVerified,
                    type: user.type
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: aTokenExp
                }
            );
            res.status(200).send(accessToken);
        } catch (error) {
            res.clearCookie("rToken");
            res.status(401).send("Refresh Token expired");
        }
    }
}

module.exports = new AuthController()
