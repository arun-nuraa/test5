/*import mongoose from "mongoose";

const orderSchema = new  mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const localorderModel= mongoose.models.order||mongoose.model("localorder",orderSchema);
export default localorderModel;
*/

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },  // ✅ Corrected default value
    payment: { type: Boolean, default: true }
});

// ✅ Ensuring model creation without duplication
const LocalOrderModel = mongoose.models.LocalOrder || mongoose.model("LocalOrder", orderSchema);

export default LocalOrderModel;
