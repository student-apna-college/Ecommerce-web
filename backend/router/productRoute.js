import express from 'express'
import {isAdmin, requireSignIn} from '../middleware/authmiddlware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productFilterController, 
    productListController, 
    productPhotoController,
    searchProductController, 
    updateProductController } from '../controllers/productController.js'
import Formidable from 'express-formidable'

const router = express.Router()

// create routes

router.post("/create-product", requireSignIn, isAdmin, Formidable(), createProductController)

//update routes

router.put("/update-product/:pid", requireSignIn, isAdmin, Formidable(), updateProductController)

//get product

router.get("/get-product", getProductController)

//single product
router.get("/get-product/:slug", getSingleProductController)

//get photo

router.get("/product-photo/:pid", productPhotoController)

// delete product

router.get("/delete-product/:pid", deleteProductController)

// filter product

router.post('/product-filter', productFilterController)

// Product count

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

// search prouduct in search bar 

router.get('/search/:keyword', searchProductController)

// category wise product

router.get('/product-category/:slug',productCategoryController)


// product route token

router.get('/braintree/token', braintreeTokenController)

// payments

router.post('/braintree/payment', requireSignIn,braintreePaymentController)





 



export default router