const express = require('express');
const userRouter = express.Router();
const userContoller = require('../controller/userController');
const { verifyToken } = require('../controller/userController');

userRouter.get("/getItems", userContoller.getItems);
userRouter.get("/product/:id", userContoller.getProductDetails);
userRouter.get("/relatedProducts/:category/:subCategory", userContoller.getRelatedProducts);
userRouter.post("/signup", userContoller.postSignup);
userRouter.get("/signin/:email/:password", userContoller.getSignin);
userRouter.post("/addToCart/:id", verifyToken, userContoller.postAddToCart);
userRouter.get("/getCartItem", verifyToken, userContoller.getCartdata);
userRouter.delete("/cart/deleteItem/:id", verifyToken, userContoller.deleteCartItem);
userRouter.post("/placeOrder", verifyToken, userContoller.postPlaceOrder);
userRouter.get("/user/orders/:userId", verifyToken, userContoller.getUserOrders);

module.exports = userRouter;