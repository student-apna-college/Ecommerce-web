import express from 'express'
import { requireSignIn, isAdmin } from '../middleware/authmiddlware.js'
import { createCategoryController, updateCategoryController ,categoryController, singleCategoryController,deleleCategoryController} from '../controllers/categoryController.js'

const router = express.Router()

//routes category 

router.post('/create-category', isAdmin, createCategoryController);

// update category

router.put('/update-category/:id', requireSignIn,isAdmin, updateCategoryController)

// get all category

router.get('/get-category', categoryController)

router.get('/single-category/:slug', singleCategoryController)


router.delete('/delete-category/:id', requireSignIn, isAdmin, deleleCategoryController)
export default router;