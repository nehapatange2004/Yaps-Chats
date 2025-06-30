import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    profilepic: String,
    preferences: Array,
    gender: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
