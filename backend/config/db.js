import mongoose from 'mongoose';

const connectDB = async () => {
    try {
            const conn = await mongoose.connect(process.env.MONGO_URL)
            console.log(`Connect to mongodb server ${conn.connection.host}`)
    }catch (error) {
        console.log(`error in mongodb ${error}`)
    }
}

export default connectDB