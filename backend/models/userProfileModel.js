const userProfileModel = mongoose.Schema(
    {
        userId: {type:Schema.Types.ObjectId, ref:'User'},
        bio: {type:String},
        contactNumber: {type:String}
    }
)

const Profile = mongoose.model("Profile", userProfileModel);
module.exports = Profile;