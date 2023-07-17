// module.exports = (role)=>{
//         return(req,res,next)=>{
//             const userRole = req.user.role;
//             if(!role.includes(userRole)){
//                 return res.status(403).json({
//                     status:'fail',
//                     error:"You are not authorized to access this"
//                 });
//             }
//             next();
//         };
// };
// auth.js
module.exports = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).json({
          status: 'fail',
          error: 'Unauthorized',
        });
      }
    };
  };
  