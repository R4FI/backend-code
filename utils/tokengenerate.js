const jwt  =  require('jsonwebtoken');
exports.generateToken = (data)=>{
const payload = {
    email:data.email,
    role:data.role,
};
const token = jwt.sign(payload,process.env.TOKEN,{
    expiresIn:'7days'
});
return token;
}

  
