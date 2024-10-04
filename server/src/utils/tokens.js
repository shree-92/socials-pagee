import jwt from "jsonwebtoken"

const generateToken = (res, userID)=>{
    const token = jwt.sign({userID}, process.env.JWT_SECRET ,{expiresIn:'2d'});
    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: true, change on deployment,
        sameSite:"strict",
        maxAge: (60*60 *1000)*48,
    })
}

export default generateToken