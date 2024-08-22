import orderModel from "../models/orderModel.js";
import userModel from  "../models/userModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
        try{
            const {name, email,password,phone,address,question} = req.body

            // validation
            if(!name){
                return res.send({message: "Name is Required"})
            }

            if(!email){
                return res.send({message: "Email is Required"})
            }

            if(!password){
                return res.send({message: "Password is Required"})
            }

            if(!phone){
                return res.send({message: "Phone is Required"})
            }

            if(!address){
                return res.send({message: "Address is Required"})
            }

            if(!question){
                return res.send({message: "Question is Required"})
            }


            const exisitinguser = await userModel.findOne({email:email})

            if (exisitinguser){
                return res.status(200).send({
                    success:false,
                    message:'Already Register please login',
                })
            }


            // register user
            const hashedPassword = await hashPassword(password)
            //save password

            const user = await new userModel({name,email, phone, address, password:hashedPassword,question}).save()

            res.status(201).send({
                success:true,
                message:"sucessfuly register",
                user,
            });

        } catch (error) {
            console.log(error)
            res.status(500).status({
                success:false,
                message:'Error in Registeration',
                error
            });
        }
};


// user login route

export const logincotroller = async(req,res) =>{
    try{
        const {email, password} = req.body
        // validation
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message:"invelid password or email"
            })
        }
        // ab password match ho gya to kese login kare kyoki password data base mai hash ki form mai hai to usko dcrpyt karna hoga pehle
        // chek user

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"emial is not register"
            })
        }
        console.log(password,user)
        const match =await comparePassword(password.toString(),user.password)

        if(!match){
            return res.status(500).send({
                success:false,
                message:"invalid password"
            })
        }

        // ab token create karna hai 

        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET)
        res.status(200).send({
            success:true,
            message:'login sucessfully',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "error in login",
            error
        })
    }
    
}

//forget passwordContoller method


export const forgotPasswordController = async(req, res) => {
    try{
        const {email,question,newPassword} = req.body
        if(!email) {
            res.status(400).send({message:'email is required'})
        }

        if(!question) {
            res.status(400).send({message:'question is required'})
        }

        if(!newPassword) {
            res.status(400).send({message:'new password is required'})
        }

        // ab hum chek ki code likna hai
        const user = await userModel.findOne({email,question})
        // validation
        if(!user){
            return res.status(404).send({
                sucess:false,
                message:'wrong email or answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset successfully,"
        });

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went worng",
            error
        })
    }    
    
    
}




// test controller

export const testController =(req,res) =>{
    res.json({ message: "Protected route", ok: true})
    
} 

// admin controller

export const isAdmin = (req,res) => {
    res.json({ message: "Protected Admin", ok: true})
}

// update profile

export const updateProfileController = async (req,res) => {
    try{
            const {name, email,password, address, phone}= req.body
            const user = await userModel.findById(req.user._id)
            if(password && password.length < 6) {
                return res.json({error:'password is required and 6 charector long'})

            }

            const hashedPassword = password ? await hashPassword(password) : undefined
            const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
                name:name || user.name,
                password:hashedPassword || user.password,
                phone:phone || user.phone,
                address:address || user.address

            },{new:true})
            res.status(200).send({
                success:true,
                message:"Profile updated success"
            })
    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message: "Error while Update profile",
            error
        })
    }
}



//orders

export const getOrderControllers = async(req,res) => {
    try{
            const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");res.json(orders);
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting Orders",
            error
        })
    }

}


// all orders

export const getAllOrderControllers = async(req,res) => {
    try{
            const orders = await orderModel.find({})
            .populate("products","-photo")
            .populate("buyer","name")
            .sort({createdAt: -1});
            res.json(orders);
           
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting Orders",
            error
        })
    }

}

// order status

export const orderStatusController = async (req, res) => {
    try{
            const {orderId} = req.params;
            const {status} = req.body
            const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
            res.json(orders);
    }catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while updating order",
            error
        })
    }
}
