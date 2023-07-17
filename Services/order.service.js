const Orders = require('../Models/Orders');


// create order
exports.createOrder = async (data) => {
    const order = await Orders.create(data);
    return order;
  };

  exports.getOrder = async () => {
    const order = await Orders.find({});
    return order;
  };

  exports.getOrderByuser = async (email) => {
    return await Orders.find({email});
   
   };

   exports.deleteOrder = async(id)=>{
    const result = await Orders.deleteMany({_id:id});
    return result;
}

// update order status by admin
exports.upateOrderStatus = async(id)=>{
  const result = await Orders.findById(id);
  result.status = newStatus;
  await result.save();
  return result;
}