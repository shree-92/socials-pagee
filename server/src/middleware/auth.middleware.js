import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"

import jwt from "jsonwebtoken"

const protect = asyncHandler(async (req, res, next)=>{
    let token;

    token = req.cookies.jwt;
    
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userID).select("-password");
            next()
        } catch (error) {
            throw new ApiError(401, error)
        }
    }else{
        throw new ApiError(401, "no tokens ???")
    }
})

export {protect}