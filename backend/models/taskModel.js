const mongoose = require("mongoose")

const taskModel = mongoose.Schema(
    {   
        title: {type:String, trim:true},
        description: {type:String, trim:true}, 
        startDate: {type:Date},
        endDate: {type:Date},
        status: {type:Boolean},
        assignedTo: {type:String},
        priority: {type:String},
    },
    {
        timestamps:true,
    }
)

const Task = mongoose.model("Task", taskModel);
module.exports = Task;