const mongoose = require("mongoose")

const taskModel = mongoose.Schema(
    {   
        id: {type:String, required:true},
        text: {type:String, trim:true},
        description: {type:String, trim:true}, 
        start_date: {type:Date},
        duration: {type:Number},
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required:true},

        progress: {type: mongoose.Schema.Types.Decimal128, default:0},

        type:{type: String},
        owner:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }],
        parent:{type:String},
        priority:{type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'}

    },
    {
        timestamps:true,
    }
)

const Task = mongoose.model("Task", taskModel);
module.exports = Task;