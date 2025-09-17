const User = require('../models/user');
const Items = require('../models/items');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shubham jakhar';
exports.getItems = async (req, res, next) => {
    const productItems = await Items.find();
    res.json(productItems);
}

exports.getProductDetails = async (req, res, next) => {
    const id = req.params.id;
    const productItem = await Items.findById(id);
    res.json(productItem);
}

exports.getRelatedProducts = async (req, res, next) => {
    const category = req.params.category;
    const subCategory = req.params.subCategory;
    const relatedProducts = await Items.find({ category: category, subCategory: subCategory });
    res.json(relatedProducts);
}

exports.postSignup = [
    check('fullname')
        .notEmpty()
        .withMessage('firstname required')
        .trim()
        .isLength({ min: 2 })
        .withMessage('minimum two charcters required in firstname')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('firstname con only contain letters'),

    check('email')
        .isEmail()
        .withMessage('enter a valid email')
        .normalizeEmail(),

    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('minimum 8 charcters required in password')
        .matches(/[a-z]/)
        .withMessage('password contains atleast one small charcter')
        .matches(/[A-Z]/)
        .withMessage('password contains atleast one capital charcter')
        .matches(/[!@#$%^&*()]/)
        .withMessage('password contains atleast one special charcter')
        .trim(),

    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('password not match');
            }
            return true;
        }),

    check('userType')
        .notEmpty()
        .withMessage('please select usertype'),
    async (req, res, next) => {
        const { fullname, email, password, userType } = req.body;
        const isExisting = await User.findOne({ email: email });
        if (isExisting) {
            console.log(isExisting);
            return res.status(422).json({ success: false, message: "email alerady registered" });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array().map(err => err.msg),
            })
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ fullname, email, password: hashedPassword, userType });
            await user.save();
            res.status(201).json({ success: true, message: "user regierted successfull" });
        } catch (err) {
            console.log(err, "error while registring user in db");
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }]

exports.getSignin = async (req, res, next) => {
    const email = req.params.email;
    const password = req.params.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ isLoggedin: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ isLoggedin: false, message: "Password is incorrect" });
        }

        const userData = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            userType: user.userType,
        };

        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '2D' });
        res.json({ isLoggedin: true, token, user: userData });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ isLoggedin: false, message: "Internal server error" });
    }
};

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id; // userId comes from token
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

exports.postAddToCart = async (req, res, next) => {
    const { size } = req.body;
    const itemId = req.params.id;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user) {
        user.cart.push({ item: itemId, size });
        await user.save();
        res.status(200).json({ success: true });
    } else {
        res.status(402).json({ success: false });
    }

}

exports.getCartdata = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (userId) {
            const response = await User.findById(userId).populate('cart.item');
            res.status(200).json(response);
        } else {
            res.status(401).json({ success: false, message: 'User not authenticated' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.deleteCartItem = async (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.userId;
    if (userId) {
        const user = await User.findById(userId);
        user.cart = user.cart.filter(cartItem => cartItem.item.toString() != itemId);
        await user.save();
    }
    res.status(200).json({ success: true });
}