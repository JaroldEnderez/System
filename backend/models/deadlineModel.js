const mongoose = require("mongoose")

const deadlineModel = mongoose.Schema(
    {
        title: {type:String}, 
        dueDate: {type:mongoose.Schema.Types.ObjectId, ref:"Task"},
        task: {type:mongoose.Schema.Types.ObjectId, ref:"Task"},    
    },
    {
        timestamps:true,
    }
)

const Deadline = mongoose.model("Deadline", deadlineModel);
module.exports = Deadline;