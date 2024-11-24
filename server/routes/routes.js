const express = require("express");
const router = express.Router();

const login_Controller = require("../controllers/loginController.js")
const signup_Controller = require("../controllers/signup_Controller")
const profile_Controller = require("../controllers/profile_Controller")
const add_shipping_address_Controller = require("../controllers/add_shipping_address_Controller")
const get_shipping_address_Controller = require("../controllers/get_shipping_address_Controller")
const allUsers_Controller = require("../controllers/allUsers_Controller")
const product_Controller = require("../controllers/product_Controller")
const get_All_products_Controller = require("../controllers/get_All_products_Controller")
const get_products_byID_Controller = require("../controllers/get_products_byID_Controller")
const update_products_byID_Controller = require("../controllers/update_products_byID_Controller")
const delete_products_byID_Controller = require("../controllers/delete_products_byID_Controller")
const add_to_cart_Controller = require("../controllers/add_to_cart_controller")
const get_user_cart_Controller = require("../controllers/get_user_cart_Controller")
const remove_product_from_cart_Controller = require("../controllers/remove_product_from_cart_Controller")
const clear_cart_Controller = require("../controllers/clear_cart_Controller")
const fav_product_Controller = require("../controllers/fav_product_Controller")
const get_fav_product_Controller = require("../controllers/get_fav_product_Controller")
const remove_prod_fav_product_Controller = require("../controllers/remove_prod_fav_product_Controller")
const decrease_product_cart_Controller = require("../controllers/decrease_product_cart_Controller")
const verify_payment_Controller = require("../controllers/verify_payment_Controller")
const add_review_Controller = require("../controllers/add_review_Controller")
const get_review_Controller = require("../controllers/get_review_Controller")
const ensureAuthenticated = require("../middleware/auth.js")


//User Endpoints
router.post("/signup", signup_Controller.signup)
router.post("/login", login_Controller.login)
router.get("/profile", ensureAuthenticated, profile_Controller.profile);
router.get("/all-users", allUsers_Controller.allusers)

//Product Api's Endpoint
router.post("/add-products", product_Controller.createProduct)
router.get("/get-all-products", get_All_products_Controller.allproducts)
router.get("/get-products-by-id/:id", get_products_byID_Controller.getProductByID)
router.post("/update-products-by-id/:id", update_products_byID_Controller.updateProductByID)
router.post("/delete-products-by-id/:id", delete_products_byID_Controller.deleteProductByID)

//review routes


//cart Api's Endpoint
router.post("/add-to-cart", ensureAuthenticated , add_to_cart_Controller.addToCart)
router.get("/get-user-cart", ensureAuthenticated,get_user_cart_Controller.getUserCart)
router.post("/remove-product-from-cart/:productId", ensureAuthenticated,remove_product_from_cart_Controller.removeProductFromcart)
router.post("/clear-cart",ensureAuthenticated, clear_cart_Controller.clearCart)
router.post("/decrease-product", ensureAuthenticated,decrease_product_cart_Controller.decreaseProduct)
router.post("/add-to-fav", ensureAuthenticated,fav_product_Controller.addToFavorites)
router.get("/get-fav-prod", ensureAuthenticated,get_fav_product_Controller.getFavorites)
router.post("/del-fav-prod/:productId", ensureAuthenticated,remove_prod_fav_product_Controller.del_fav)

router.post("/add-shipping-address", ensureAuthenticated , add_shipping_address_Controller.addShippingAddress)
router.get("/get-shipping-address", ensureAuthenticated , get_shipping_address_Controller.getShipingAddress)

//payment method
router.post("/verify-payment", ensureAuthenticated , verify_payment_Controller.verify_payment)


//review 
router.post("/add-review/:id", ensureAuthenticated , add_review_Controller.add_review)
router.get("/get-reviews/:id" , get_review_Controller.get_review)

module.exports = router;