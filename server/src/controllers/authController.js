import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const generateToken = (id) => {
    return (jwt.sign({ user: { id } }, process.env.JWT_SECRET, { expiresIn: "1d" }));
}

export const signup = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ success, message: "User with this email already exists." });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const token = generateToken(user._id);
        success = true;
        res.status(201).json({
            success, token, message: "User created successfully.", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (e) {
        res.status(500).json({ success, message: "Internal Server Error." });
    }
}

export const login = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ success, message: "Invalid Credentials." });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ success, message: "Invalid Credentials." });
        const token = generateToken(user._id);
        success = true;
        res.status(200).json({
            success, token, message: "Login Successful", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (e) {
        res.status(500).json({ success, message: "Internal Server Error." });
    }
}

export const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
