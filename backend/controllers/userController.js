const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async(req,res) => {
    
    const {name,email, contact, password} = req.body
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please supply all the fields required")
    }
    
    const userExists = await User.findOne({email})
    
    if (userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        contact,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            password: user.password,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Failed to create user")
    }

    
    }
)

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const userExists = await User.exists({ email });

  console.log("User exist? ", userExists)
  if (user && (await user.matchPassword(password))) {
    // Use user.matchPassword instead of User.matchPassword
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // Do not include the password in the response for security reasons
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});


const allUsers = asyncHandler(async(req,res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {     
        console.error(error);
        res.status(500).send('Server Error');
      }
})

const updateExistingUsers = asyncHandler(async(req,res) => {
  try {
    // Find all existing users
    const users = await User.find();

    // Update role property for each user
    await Promise.all(users.map(async (user) => {
      if (!user.role) {
        user.role = 'user';
        await user.save();
      }
    }));

    console.log('All users updated successfully.');
  } catch (error) {
    console.error('Error updating users:', error);
  }
})

const getUserById = asyncHandler(async(req,res) =>{
  const userId = req.params._id
  const user = await User.findById(userId)
  
  try{
    
    if(!user) {
      return res.status(404).json({message:"User does not exist: ", userId})
    }
    res.json({name:user.name, pic:user.pic})
  }catch(error){
    console.error("Error fetching user: ", error)
    res.status(500).json({message: "Internal server error"})
  }

})

module.exports = {registerUser, authUser, allUsers,updateExistingUsers, getUserById}