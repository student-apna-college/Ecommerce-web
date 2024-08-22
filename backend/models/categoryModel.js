import mongoose from 'mongoose'

const categorySchmema = new mongoose.Schema({
    name:{
        type:String,
        //required: true,
        
    },
    slug:{
        type:String,
        lowercase:true
    }
});

export default mongoose.model("Category", categorySchmema);