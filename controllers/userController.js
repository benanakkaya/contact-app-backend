import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, surname, password, email } = req.body;

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
        return res.status(500).json({ message: "E-mail is already registered!" })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const createdUser = await User.create({
        name,
        surname,
        password: hashedPassword,
        email
    });

    return res.status(201).json({ message: "You have registered successfully!", createdUser });

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("contacts").populate({
        path: 'groups',
        populate: {
            path: 'members'
        }
    });;

    if (!user) {
        return res.status(500).json({ message: "No registered user was found!" });
    }

    const passwordCheck = await bcryptjs.compare(password, user.password);

    if (!passwordCheck) {
        return res.status(500).json({ message: "Please check your password!" });
    }

    const token = await createToken(user._id);

    return res.status(200).json({ message: "Congratulations, you have successfully logged in!", token, user })

}


const createToken = async (userID) => {
    return jwt.sign({ userID }, "SECRET_KEY", { expiresIn: "2h" })
}


export const getUser = async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id).populate("contacts").populate({
        path: 'groups',
        populate: {
            path: 'members'
        }
    });

    return res.status(200).json(user)
}