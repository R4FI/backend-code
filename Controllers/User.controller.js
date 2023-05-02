const User = require("../Models/User");
const { getUser,getSingleUser } = require("../Services/user.service");
// GET
exports.getUser = async(req,res)=>{
  try{
          const user = await getUser()
          res.status(200).json({
              status:"success",
              data: user
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

// GET SINGLE USER
exports.getSingleUser = async(req,res)=>{
  try{
          const {id} = req.params
          const user = await getSingleUser(id);
          res.status(200).json({
              status:"success",
              data: user
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

// POST
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
        name,
        email,
        password
      });
     const users = new User(req.body)
     const result =  await  users.save();
    res.status(200).json({
      status: "success",
      message: "Data Inserted Sucessfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not Inserted",
      error: error.message,
    });
  }
};



