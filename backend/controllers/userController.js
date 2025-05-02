import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/token.js";


// LOGIN for user which will generate token
// API:: /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        generateToken(res, user, _id);
        const token = user.token

        res.json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
})



// API :: /api/users
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error("User Account Email already in use");
    }

    const user = await User.create({
        name, email, password,
    });
    console.log(user);

    if (user) {
        generateToken(res, user_id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid Data")
    }
})


// API :: /api/users/logout
const logoutUser = (req,res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message:"User Logged Out successfully"})
}


// API :: /api/users/profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else{
        res.status(400);
        throw new Error("User Not FOUnd");
    }
})


const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name ||user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    } else {
        res.status(404);
        throw new Error("User not found")
    }
})

export {loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile};