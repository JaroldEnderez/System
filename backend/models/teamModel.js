const mongoose = require("mongoose")

const teamModel = mongoose.Schema(
    {
        first_name:  {type:String, required:true},
        last_name: {type:String, required:true},
        role: {type:String, required:true},
        pic:{
            type: String,
            default: "https://icon-library.com/icon/anonymous-avatar-icon-25.html"
        }
    },
    {
        timestamps:true,
    }
)

const User = mongoose.model("User", userModel);
module.exports = User;