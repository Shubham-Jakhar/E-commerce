const express = require('express');
const userRouter = express.Router();
const userContoller = require('../controller/userController');

userRouter.get("/getItems",userContoller.getItems);
userRouter.get("/product/:id",userContoller.getProductDetails);
userRouter.get("/relatedProducts/:category/:subCategory",userContoller.getRelatedProducts);
userRouter.post("/signup",userContoller.postSignup);
userRouter.get("/signin/:email/:password",userContoller.getSignin);
userRouter.post("/signout",userContoller.postSignout);
userRouter.post("/addToCart/:id",userContoller.postAddToCart);
userRouter.get("/getCartItem",userContoller.getCartdata);

module.exports=userRouter;