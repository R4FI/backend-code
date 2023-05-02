const mongoose = require("mongoose");
const app = require("../app");
const bcrypt = require('bcrypt');
// user scheema design
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avater:
  {
    type:String,
    data: Buffer,
    
  },
  date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next()
    }
    catch(error){
        console.log(error)
    }
})
module.exports = User = mongoose.model('user', UserSchema);
