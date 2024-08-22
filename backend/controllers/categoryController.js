import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController  = async(req,res) => {
    try{
        const { name }= req.body;
        if (!name) {
            return res.status(401).send({message:'name is required'});
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exisits'
            })
        }

        const category = new categoryModel({name, slug:slugify(name)}).save()
        res.status(200).send({
            success:true,
            message:'new catogery created',
            category
        }
        )
    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })
    }
};


export const updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            sucess:true,
            message:'category update succesfully',
            category,
        })
    }catch(error) {
        console.log(error)
        res.status(400).send({
            sucess:false,
            message:"error in update"

        })
    }
};


//get all category
    export const categoryController = async(req, res) => {
        try{
            const category = await categoryModel.find({});
            res.status(200).send({
                success:true,
                message:"All Categories list",
                category,
            })

        }catch(error){
        console.log(error)
        res.status(500).send({
        sucess:true,
        error,
        message:'error while getting all categories'

        })
    }
    
};

// single category
export const singleCategoryController = async(req, res) => {
    try{
            const category = await categoryModel.findOne({slug: req.params.slug});
            res.status(200).send({
                success:true,
                message:"successfuly get single category",
                category
            })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:true,
            error,
            message:"error in single catogery"
        })
        
    }
};

// delete category
export const deleleCategoryController = async(req,res) =>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            message:"category deleted"
        })

    }catch(error){
    console.log(error)
    res.status(500).send({
        sucess:false,
        message:"error in delete",
        error
    })
}
}