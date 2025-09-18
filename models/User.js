import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String, 
  profileImage: { type: String, default: "" },

});

const User=mongoose.models.User || mongoose.model("User", UserSchema);
export default User;