import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
  name: { type: String },
  linkHandle: { type: String, required:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String , },
  links: [{
    url:{type:String},
    title:{type:String},
    icon:{type:String}
  }]
});


// hashing the pass before saving it into our data base
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) { 
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // Handle error during hashing
    return next(error);
  }
});


// making our custom methods to check passwords is correct or not
userSchema.methods.matchPasswords = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}


const User = new mongoose.model("User", userSchema)

export default User;