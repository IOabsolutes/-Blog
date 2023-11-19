import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../modules/User.js";
export async function signUp(req, res) {
    try {

        //hash password
        const password = req.body.password;
        // algoritm of crypt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // user schema you was receive when user paste data
        const UserSchema = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
        // here i added user schema if i did something wrong
        const CreateUser = await UserSchema.save();
        const token = jwt.sign({
            _id: CreateUser._id
        }, "secretHash", { expiresIn: "90d" })
        const { passwordHash, ...UserData } = CreateUser._doc
        res.json({
            UserData,
            token,
            sucses: true,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: "failed registation",
            error
        })
    }
}
export async function signIn(req, res) {
    try {
        const findUser = await User.findOne({ email: req.body.email })
        if (!findUser) {
            return res.status(404).json({ massage: 'user does`t exist' })
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, findUser._doc.passwordHash)
        if (!isPasswordCorrect) {
            return res.status(400).json({ massage: 'incorrect password or login' })
        }
        const token = jwt.sign({
            _id: findUser._id
        }, "secretHash",
            { expiresIn: "30d" })

        const { passwordHash, ...UserData } = findUser._doc
        res.json({
            UserData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            massage: "loged in failed",
            error
        })
    }
}
export async function getUser(req, res) {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(401).json({ massage: 'user does`t found' })
        }
        const { passwordHash, ...UserData } = user._doc
        res.json(UserData)
    } catch (error) {
        return res.status(500).json({ massage: 'acces denied' })
    }

}