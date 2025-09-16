const User = require('../models/user');
const Items = require('../models/items');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
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

        req.session.user = userData;
        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                return res.status(500).json({ isLoggedin: false, message: "Error saving session" });
            }
            console.log("Session saved, sending cookie.");
            res.status(200).json({ isLoggedin: true, data: req.session.user });
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ isLoggedin: false, message: "Internal server error" });
    }
};

exports.postSignout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ isLoggedin: true, message: "Failed to log out" });
        }
        res.clearCookie("connect.sid");
        res.status(200).json({ isLoggedin: false, message: "Logged out successfully" });
    });
}

exports.postAddToCart = async (req, res, next) => {
    const { size } = req.body;
    const itemId = req.params.id;
    const userId = req.session.user.id.toString();
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
    const userId = req.session.user.id.toString();
    if (userId) {
        const response = await User.findById(userId).populate('cart.item');
        res.status(200).json(response);
    } else {
        res.status(402).json({ success: false })
    }
}

exports.deleteCartItem = async (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.session.user.id.toString();
    if (userId) {
        const user = await User.findById(userId);
        user.cart = user.cart.filter(cartItem => cartItem.item.toString() != itemId);
        await user.save();
    }
    res.status(200).json({ success: true });
}