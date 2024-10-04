import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import User from "../models/user.model.js"
import generateToken from "../utils/tokens.js"

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
const getUserProfile = asyncHandler( async(req,res)=>{

    //  getting the cookie from the user
    const token = req.cookies.jwt;

    // checking if the cookie exist or not
    if(!token){throw new ApiError(401, "no cookie pls log in again to get one")}
    console.log(token);
    

    // verifying the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // fetching userProfile from our data base
        //** we have used userID to make the token and we will use JWTsecret retrive our userID and search for user
        const userProfile = await User.findById(decoded.userID).select("-password");

        // incase no such user exist
        if(!userProfile){ throw new ApiError(401, "no such user exist in data base")}

        // response
        res.status(200).json({
            DECODED:decoded,
            USERProfile:userProfile
        })
        
    } catch (error) {
        throw new ApiError(404, "invalid token log in ")
    }
} )

// protected route
const updateUserProfile = asyncHandler( async(req,res)=>{
    res.status(200).json("messsage should only be shown when user has our cookie")
} )

const linkHandler = asyncHandler( async(req,res)=>{} )

export {
    loginUser,
    logoutUser,
    registerUser,
    linkHandler,
    updateUserProfile,
    getUserProfile
}
