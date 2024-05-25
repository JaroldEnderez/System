const mongoose = require("mongoose")

const projectModel = mongoose.Schema(
    {
        contract: {type:String, trim:true},

        contractor: {type:String, trim:true},

        funds: {type:Number, trim:true},

        isOngoing: {type:Boolean, default:false},

        city: { type: String },
        
        province: { type: String },
        
        street: { type: String },
        
        procuring_entity: {type:String, trim:true},
        
        project_name: {type:String, trim:true},

        startDate: {type:Date},

        targetDate: {type:Date},

        percentage: {type:Number},
        
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Ongoing', 'Paused'],
            default: 'Ongoing'
          },

        tasks: [{type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',}],

        projectDescription: {type: String},
        discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
        milestones: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Milestone'
          }]
<<<<<<< HEAD
    
    
    
=======
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
    },
    {
        timestamps:true,
    }
)

const Project = mongoose.model("Project", projectModel);
module.exports = Project;