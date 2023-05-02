const mongoose = require("mongoose");

// schema design 
const productSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
        trim: true, 
        unique: [true,"Name must be unique"],
        minLength: [3, "Name must be 3 character"],
        maxLength: [100, "Name is too large"]

    },
    avatar:{
        type:String,
        data:Buffer
    },
    description:{
            type: String,
          
    },
    price:{
        type:Number,
        required: true,
        min:[0, "Price can't be negetive"],
    },
    unit:{
        type:String,
        required: true,
        enum:{
            values:  ["kg","litre","pcs"],
            message:"unit value can't be {value},must be kg/litre/pcs"
        }
    },
    quantity:{
        type:Number,
        required:true,
        min:[0, "qty can't be negetive"],
        validator:(value)=>{
            const isInteger= Number.isInteger(value);
            if(isInteger){
                return true;
            }
            else{
                return false;
            }
        },
    
    message: "Qty must be integer"
},
status:{
        type:String,
        required: true,
        enum:{
        values:  ['in-stock','out-of-stock','Discontinued' ],
        message:"status can't be {VALUE}"
}
},
// createdAt:{
//     type:Date,
//     default: Date.now,
// },
// updatedAt:{
//     type:Date,
//     default:Date.now
// }
supplier:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Supplier"
},
categories:{
        type: String,
        required:true 
    },
},
{
timestamps:true,
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product;