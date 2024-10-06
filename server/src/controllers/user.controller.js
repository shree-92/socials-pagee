import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import User from "../models/user.model.js"
import generateToken from "../utils/tokens.js"

import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})


// imp for getUserProfile controller refer generate token too
import jwt from "jsonwebtoken"


const registerUser = asyncHandler( async(req,res)=>{
    const {email,password,linkHandle} = req.body;

    // checking for empty input fields
    if(
        [ email, password, linkHandle].some( (fields) => fields?.trim() === "" )
    ){
        throw new ApiError(400, 'all fields are needed')
    }

    // checking if such user already exists on our data base
    const emailTaken = await User.findOne({email:email})

    const linkHandleTaken = await User.findOne({linkHandle:linkHandle})

    // throwing errors incase of the email or linkHandle has already been taken
    if(emailTaken){throw new ApiError(40, "this email is already registerd on our database")};
    if(linkHandleTaken){throw new ApiError(401, "this link has already been taken by someone else try some other link")};

    // if passed above all errors we will make an entry into database
    const user = await User.create({
        email:email.toLowerCase(),
        linkHandle:linkHandle.toLowerCase(),
        password:password
    })

    // checking if the entry was successfull or not
    const userIDofCreatedUser = await User.findById(user._id).select(" -refreshToken -_id")

    if(!userIDofCreatedUser){ throw new ApiError(500, "failed to create user entry in data base")}

    // API response

    return res.status(201).json(
        new ApiResponse(201, userIDofCreatedUser ,"user has been registerd")
    )
} )

const loginUser = asyncHandler( async(req,res)=>{
    const {email, password} = req.body;

    //  check if the data aint empy
    if(!email || !password) {throw new ApiError(401, "for logging both fields are required")}

    // finding the user with such email exist in our data base
    const user = await User.findOne({email})

    // error handling for not found
    if(!user){throw new ApiError(404, "user not found")}

    // check for password is valid or not
    const isPasswordCorrect = await user.matchPasswords(password)

    // error if password is wrong
    if(!isPasswordCorrect){ throw new ApiError(401, "wrong password")}

    // removing the password from user before sending
    user.password = undefined
    
    // now give access tokens
    generateToken(res, user._id);
    res.set("Access-Control-Allow-Credentials", "true")
    return res.status(200).cookie("testetstest", "evjefjkbfekebfwk").json( new ApiResponse(200, "user logged in and cookie is"))  

} )

const logoutUser = asyncHandler( async(req,res)=>{
    res.cookie("jwt", "", {
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json(new ApiResponse(200, "user logged out"))
} )

// protected route
const updateUserProfile = asyncHandler( async(req,res)=>{
    
    const {linkHandle , email, name} = req.body;

    const token = req.cookies.jwt;
    console.log(token)

    if(!token){throw new ApiError(404, "no token no cookies")}

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const UpdateUser = await User.findById(decoded.userID);

        if(!UpdateUser){throw new ApiError(404, "no user found by this id")};

        // changing the old details with new one
        UpdateUser.email = email || UpdateUser.email ;
        UpdateUser.linkHandel = linkHandle || UpdateUser.linkHandle;
        UpdateUser.name = name || UpdateUser.name;

        await UpdateUser.save()
    } catch (error) {
        console.log(error, "token decoding went wrong");
    }

    res.status(200).json("user mustve updated now")

} )

const getUserProfile = asyncHandler(asyncHandler(async(req,res)=>{
     // Getting the cookie from the user
    const token = req.cookies.jwt;
    console.log("Received Token:", token); // Log the received token

    // Checking if the cookie exists or not
    if (!token) {
        console.error("No cookie found. User must log in."); // Log the error
        throw new ApiError(401, "No cookie, please log in again to get one");
    }
    
    // Verifying the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log the decoded token
        
        // Fetching userProfile from the database
        const userProfile = await User.findById(decoded.userID).select("-password");

        // In case no such user exists
        if (!userProfile) {
            console.error("No such user exists in the database."); // Log error
            throw new ApiError(404, "No such user exists in the database");
        }

        // Response
        res.status(200).json({
            USERProfile: userProfile
        });
        
    } catch (error) {
        console.error("Error verifying token or fetching user:", error); // Log the error
        throw new ApiError(401, "Invalid token, log in again");
    }

}))


const linkHandler = asyncHandler( async(req,res)=>{

    // getting the link from body
    const {linkHandle} = req.body
    console.log("linkHandle", linkHandle);
    

    //checking if its valid or not
    if(!linkHandle){throw new ApiError(400, 'invalid linkHandle')}

    // searching for them in our database
    const linkShowCase = await User.findOne({linkHandle}).select("-password -_id");
    console.log("linkShowCase", linkShowCase);
    

    // checking if such link is claimed or not
    if(!linkShowCase){ throw new ApiError(404, "these link is not claimed yet")}

    // show the links and user details
    res.status(200).json(linkShowCase)
} )

export {
    loginUser,
    logoutUser,
    registerUser,
    linkHandler,
    updateUserProfile,
    getUserProfile
}
