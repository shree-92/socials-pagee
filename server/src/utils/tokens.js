import jwt from "jsonwebtoken"

import dotenv from"dotenv"

dotenv.config({
    path:"./.env"
})

const generateToken = (res, userID)=>{
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({userID}, process.env.JWT_SECRET ,{expiresIn:'2d'});
    console.log(token);
    // res.cookie('jwt', token, {
    //     httpOnly: false,
    //     secure: false, //change on deployment,
    //     sameSite:"None",
    //     maxAge: (60*60 *1000)*48,
    // })
    res.cookie("jwt", token, {
        
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            httpOnly: true, // Cookie is not accessible via JavaScript
            secure: false,   // Cookie is sent only over HTTPS (set to false in development)
            sameSite: 'strict' // Helps prevent CSRF attacks
          
    })
    console.log("Cookie set:", res.getHeaders()['set-cookie']);
}

export default generateToken