const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');
const { verifyToken } = require('../controller/userController');

adminRouter.get("/getAllProducts", verifyToken, adminController.getAllProducts);
adminRouter.post("/addProduct", verifyToken, adminController.addProduct);
adminRouter.delete("/deleteProduct/:itemId", verifyToken, adminController.deleteProduct);
adminRouter.post("/updateProduct/:productId", verifyToken, adminController.updateProduct);

module.exports = adminRouter;