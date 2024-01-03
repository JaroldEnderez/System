const mongoose = require("mongoose")
const Task = require('./taskModel');

const projectModel = mongoose.Schema(
    {
        contract: {type:String, trim:true},

        contractor: {type:String, trim:true},

        funds: {type:Number, trim:true},

        isOngoing: {type:Boolean, default:false},

        location: {type:String, default:true},

        procuring_entity: {type:String, trim:true},
        
        project_name: {type:String, trim:true},

        startDate: {type:Date},

        targetDate: {type:Date},

        percentage: {type:Number},
        
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Ongoing', 'Paused'],
            default: 'Pending',
          },

        tasks: [Task.schema]
    },
    {
        timestamps:true,
    }
)

const Project = mongoose.model("Project", projectModel);
module.exports = Project;