const mongoose = require('mongoose');

// creating schema 
const orderSchema = mongoose.Schema({

name:{
    type:String,
   
},
image:{
    type:String,
   
},
totalPrice:{
    type:String,
   
},
quantity:{
    type:String,
   
},
categories:{
    type:String,
   
},
status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
    email:{
        type: String
      
    },


},
{
    timeStamps:true
}
);




const Orders = mongoose.model("Order",orderSchema);
module.exports = Orders;