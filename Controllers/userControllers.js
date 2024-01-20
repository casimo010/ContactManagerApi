import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';



// GET /users
const getAllusers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});





// @description Register user
// @route post /api/users
// @access public
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error(" All fields are required in the request!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User has been created: ${newUser}`);

  // do not show hash password to the user
  if (newUser) {
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error ({ message: "User data is invalid!" });
  }
});
   // res.json({message:"register user successfuly"});

// @description login user
// @route post /api/users
// @access public
  const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
      res.status(400);
      throw new Error({ message:" all feilds are mandatory"});
    }
    const user = await User.findOne({email});
    // compare password and hash password 
    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign({
        user:{
          username: user.username,
          email: user.email,
          id: user.id
        }
      }, process.env.ACCESS_TOKEN,
        {expiresIn: "15m"}
      )
      res.status(200).json({accessToken});
    } else{
      res.status(401);
      throw new Error({message:"email or password is not valid"});
    }
  });

// @description current user
// @route Get /api/users
// @access private
  const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


  export  {userRegister,userLogin,currentUser,getAllusers};