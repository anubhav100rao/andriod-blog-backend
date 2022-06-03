const UserModel = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async(req, res) => {
    // check existing user
    // hashed password
    // user creation
    // token generation

    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10); // salt = 10
        const result = await UserModel.create({
            email,
            password: hashedPassword,
            username
        })

        const token = jwt.sign({
            email: res.email,
            id: result._id
        }, SECRET_KEY); // (payload, secret_key)

        res.status(201).json({
            user: result,
            token: token
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "something went wrong"
        })
    }

}

const signin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if(!existingUser) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, SECRET_KEY)

        res.status(200).json({
            user: existingUser,
            token: token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

module.exports = { signup, signin };