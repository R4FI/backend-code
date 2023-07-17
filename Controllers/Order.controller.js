const { createOrder, getOrder,deleteOrder, getOrderByuser } = require("../Services/order.service");




exports.getAllOrder = async(req,res)=>{
  try{
          const order = await getOrder()
          res.status(200).json({
              status:"success",
              data: order
          })
      }
  catch(error){
          res.status(400).json({
          status:"fail",
          message:"cannot get data",
          error: error.message,
          })
          
      }
}

exports.placedOrder = async(req,res,next)=>{
    try{
        const result = await createOrder(req.body);        
        res.status(200).json({
          status:'success',
          message:'Order Placed successfully',
          data:result
        })
    }
    catch(error){
      res.status(500).json({
        status:'fail',
        message:error.message
      })
  
    }
  }

  exports.getMyOrder = async(req,res,next)=>{
    try{
      const email = req.query.email;
      const orders = await getOrderByuser(email);
     res.status(200).json({
      status:"success",
      data:orders
     })
    }
    catch(error){
      res.status(500).json({
        status:"fail",
        message:error.message
      })
      

    }
}

exports.deleteOrders = async(req,res,next)=>{
  try{
     const {id} = req.params
      const result = await deleteOrder(id);
      if(!result.deletedCount){
          return res.status(400).json({
              status:"fail",
              error:"could not delete"
          })
      }
      res.status(200).json({
          status:"success" ,
          message:"successfully deleted"
      })

  }
  catch(error){
      res.status(400).json({
          status: "fail",
          message: "Could not delete the product",
          error: error.message

      })

  }
}

// upate order status
exports.updateStatus = async(req,res)=>{
  const { id } = req.params; // Assuming you pass the order ID as a parameter
  const { status } = req.body; // Assuming you receive the new status in the request body

  try {
    const updatedOrder = await orderService.updateOrderStatus(id, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}