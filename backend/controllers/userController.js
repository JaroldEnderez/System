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

module.exports = {registerUser, authUser, allUsers}