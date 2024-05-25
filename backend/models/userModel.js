const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userModel = mongoose.Schema(
    {
        name:  {type:String, required:true},
        email: {type:String, required:true, unique:true},
        contact: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        role:{type: String,
            enum: ['user', 'project manager', 'client', 'admin'], // Add more roles as needed
            default: 'user' // Set a default role if needed
        }, 
        pic:{
            type: String,
            default: "https://icon-library.com/icon/anonymous-avatar-icon-25.html"
        }
    },
    {
        timestamps:true,
    }
)
userModel.methods.matchPassword = async function(enteredPassword){
    console.log('matchPassword method executed');
  console.log('enteredPassword:', enteredPassword);
  console.log('this.password:', this.password);
    return await bcrypt.compare(enteredPassword, this.password)
}


userModel.pre('save', async function(next){
    console.log('Pre-save hook executed');
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userModel);
module.exports = User;