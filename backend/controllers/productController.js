import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();


// payment gatway

var getway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANR_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,

    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

export const createProductController = async(req, res) =>{

    try{       
       const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        console.log(photo,photo.size)
// validation part
        switch(true){
            case !name:
            return res.status(500).send({error:'Name is Required'})

            case !description:
            return res.status(500).send({error:'Description is Required'})

            case !price:
            return res.status(500).send({error:'Price is Required'})

            case !category:
            return res.status(500).send({error:'Catogoey is Required'})

            case !quantity:
            return res.status(500).send({error:'Quantity is Required'})

            case photo && photo.size >1000000:
            return res.status(500).send({error:'photo is Required'})

        }

        const products = new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product Created Successfully",
            products,
        });

    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error create in product "
    });
} 
};

export const getProductController = async(req,res) =>{
        try{
            const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createAt:-1})
            res.status(200).send({
                success:true,
                message:"get all product success",
                products,
                total:products.length
            })

        }catch (error){
        console.log(error)
        res.status(500).send({
            success:true,
            message:"while getting single product",
            error

        });
    };

};

export const getSingleProductController = async(req, res) =>{
    try{

        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            sucess:true,
            message:"sucessfully get single product",
            product

        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            message:"while getting single product",
            error

        })
    }

};

//get photo

export const productPhotoController = async(req, res) => {
    try{
            const product = await productModel.findById(req.params.pid).select("photo")
            if(product.photo.data){
                res.set('Content-type',product.photo.contentType)
                return res.status(200).send(
                    product.photo.data)
            }
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            message:"problem in product photo",
            error
        })
    }
}


// delete product

export const deleteProductController = async(req, res) =>{
        try{
                await productModel.findByIdAndDelete(req.params.pid).select("-photo")
                res.status(200).send({
                    success:true,
                    message:"Product deleted successfully"
                })
        }catch(error){
            console.log(error)
            res.status(500).send({
                success:false,
                message:"errro while deleting",
                error
            })
        }
}


// update product


export const updateProductController = async(req, res) =>{

    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
// validation part
        switch(true){
            case !name:
            return res.status(500).send({error:'Name is Required'})

            case !description:
            return res.status(500).send({error:'Description is Required'})

            case !price:
            return res.status(500).send({error:'Price is Required'})

            case !category:
            return res.status(500).send({error:'Catogoey is Required'})

            case !quantity:
            return res.status(500).send({error:'Quantity is Required'})

            case photo && photo.size >1000000:
            return res.status(500).send({error:'photo is Required'})

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product updated Successfully",
            products,
        });

    }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error update in product "
    });
} 
};


// filter controller

export const productFilterController = async (req,res) =>{
    try{
            const {checked, radio} = req.body
            let args ={}
            if(checked.length > 0) args.category = checked
            if(radio.length) args.price = {$gt: radio[0],$lt:radio[1]}
            const product = await productModel.find(args)
            res.status(200).send({
                success:true,
                product,
            })
    }catch(error){
        console.log(error)
        res.status;false,
        message;"Error in filter";
        error
    }
}


// product count 

export const productCountController = async(req,res) =>{
            try{
                    const total = await productModel.find({}).estimatedDocumentCount();
                    res.status(200).send({
                        success:true,
                        total,
                    })
            }catch(error){
                console.log(error)
                res.send(400).send({
                    message:'error in product count',
                    error,
                    success:false
                })
            }
};

export const productListController = async(req,res) => {
    try{
            const perPage = 6;
            const page = req.params.page ?req.params.page : 1
            const product = await productModel
            .find({})
            .select('-photo')
            .skip((page-1)* perPage)
            .limit(perPage)
            .sort({createdAt:-1});
            res.status(200).send({
                success:true,
                product

            })
    }catch(error){
            console.log(error)
            res.send(400).send({
                message:'error in product list ',
                error,
            })
    }
}


//search product

export const searchProductController = async (req, res) =>{
try{
        const{keyword} = req.params
        const results = await productModel.find({
            $or:[
                {name:{$regex :keyword, $options: "i"}},
                {description:{$regex: keyword,$options: "i"}},
            ]
        }).select("-photo")
        res.json(results)
}catch(error){
    console.log(error)
    res.status(400).send({
        success:false,
        message:"error in search api",
        error
    })
}
}

// get prouduct by category

export const productCategoryController = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            category,
            products,
        })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:'Error while getting prodcuts'
        })
    }
}

export const braintreeTokenController = async (req,res) =>{
        try{
            getway.clientToken.generate({}, function(err, response){
                if(err){
                    res.status(500).send(err)
                }else{
                    res.send(response);
                }
            })
        }catch(error){
            console.log(error)
        }
}

export const braintreePaymentController = async(req,res) =>{
    try{
            const {cart, nonce} = req.body
            let total = 0
            cart.map (i => total += i.price)
            let transaction = getway.transaction.sale({
                amount:total,
                paymentMethodNonce:nonce,
                options:{
                    submitForSettlement:true
                }
            },
                function(error,result){
                    if(result){
                        const order = new orderModel({
                            products:cart,
                            payment:result,
                            buyer:req.user._id
                        }).save()
                        res.json({ok:true})
                    }else{
                        res.status(500).send(error)
                    }
                }
            ,)
    }catch (error){
        console.log(error)
    }

}











