import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://arunnura:7339514895@cluster0.im1fg2i.mongodb.net/cafehubfinal').then(()=>console.log("DB Connected"))
}
