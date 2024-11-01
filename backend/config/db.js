import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://anishkumar:anish123@fooddelivery.ignym.mongodb.net/?retryWrites=true&w=majority&appName=FoodDelivery').then(()=>{
        console.log("DB Connected Successfully")
    })
}