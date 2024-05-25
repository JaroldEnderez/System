const mongoose = require("mongoose")

const taskModel = mongoose.Schema(
    {   
        text: {type:String, trim:true},
        description: {type:String, trim:true}, 
        start_date: {type:Date},
        duration: {type:Number},
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required:true},
<<<<<<< HEAD
        progress: {type: mongoose.Schema.Types.Decimal128, default:0}
=======
        progress: {type: mongoose.Schema.Types.Decimal128, default:0},
        type:{type: String},
        owner:[{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          }],
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
    },
    {
        timestamps:true,
    }
)

const Task = mongoose.model("Task", taskModel);
module.exports = Task;