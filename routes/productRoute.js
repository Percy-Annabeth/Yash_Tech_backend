const express = require("express");
const {createProduct,getAllProducts, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");

//making a router object, then we will just export it and not all the indiviual routes
const router = express.Router();

//making indiviual routes in the router.
//create product route
router.route("/product/new").post(createProduct);

//get all products route
router.route("/products").get(isAuthenticatedUser, getAllProducts);



//update product , delete product , get product details . route
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

module.exports = router;



