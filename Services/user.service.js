const User =  require('../Models/User');

// get user
exports.getUser= async() =>{
    const user= await User.find({})
    return user; 
}
// get single user
exports.getSingleUser= async(id) =>{
    const user= await User.findOne({_id:id});
    return user; 
}

// post user
exports.createUser = async(data)=>{
    const user =   await User.create(data)
    return user; 
}