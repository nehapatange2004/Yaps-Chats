import {
  comparePasswords,
  generateToken,
  hashPassword,
} from "../utils/auth.utils.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
});

export const signInUser = async (req, res) => {
  try {
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.password);
    const user = await User.findOne({ email: req.body.email });
    //match the password
    if (!user) {
      res.status(401).send({ error: "User not found!" });
    }

    const isMatch = await comparePasswords(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: "Invalid Credentials!" });
    }

    // const foundUser = {
    //   email: user.email,
    //   name: user.name,
    //   token: generateToken(user._id, user.email),
    //   profilepic: user.profilepic,
    //   preferences: user.preferences,
    //   id: user._id,
    // }

    // console.log("is Matched? ", isMatch);
    // console.log("wohoo!! the password is correct!");

    const foundUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilepic: user.profilepic,
      updatedAt: user.updatedAt,
      // createdAt: req.user.updatedAt,
      preferences: user.preferences,
      token: generateToken(user._id, user.email),
    };

    console.log(foundUser);
    res.send(foundUser);
  } catch (err) {
    console.log("Error while getting data from mongo: ", err);
    res.send({ error: "erorrrr-sigin" });
  }
};

export const signUpNewUser = async (req, res) => {
  try {
    // console.log(req.body.name);
    // console.log(req.body.email);
    // console.log(req.body.password);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("User already exists: ", user);
      return res
        .status(403)
        .send({ error: "Already have an account! Consider logging in!" });
    }
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      profilepic: req.body.profilepic
    });
    await newUser.save();
    const createdUser = await User.findOne({ email: req.body.email });
    // const foundUser = {
    //   email: createdUser?.email,
    //   name: createdUser?.name,
    //   token: generateToken(createdUser?._id, createdUser?.email),
    // };

    const foundUser = {
      _id: createdUser?._id,
      name: createdUser?.name,
      email: createdUser?.email,
      profilepic: createdUser?.profilepic,
      updatedAt: createdUser?.updatedAt,
      createdAt: createdUser?.updatedAt,
      preferences: createdUser?.preferences,
      token: generateToken(createdUser?._id, createdUser?.email),
    };

    console.log("Account Created successfully!");
    return res.send(foundUser);
  } catch (err) {
    console.log("Error while getting data from mongo: ", err);
    return res.send({ error: "Internal Server Error" });
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user?.email });
    if (req.body?.profilepic) {
      console.log("Towards updating the profile pic for\n", req.user);
      await User.updateOne(
        { _id: req.user._id },
        {
          $set: { profilepic: req.body.profilepic },
        }
      );
      // console.log("profile set in the db done!");
      const updatedUser = await User.findOne({ email: req.user?.email });
      console.log("Profile Pic: ", req.body.profilepic);

      // console.log("Upadated USERDETAILS: ", updatedUser);
      return res.send(updatedUser);
    }
    // console.log("Body of updateprofile: ", req.body)
    if(!req.body.base64) return res.send({"message": "No profile pic selected!"});
    
    
      //when teh user have his/her own img from storage
      const filePath = req.body.base64;

      const result = await cloudinary.uploader.upload(filePath, {
        public_id: `${req.user._id}`,
        overwrite: true,
        folder: "samples/test1",
      });
      // const data = await result.json();
      // console.log("dAta: ", result);
      // console.log("Req body: ", filePath);
      // cloudinary

      await User.updateOne(
        { _id: user._id },
        {
          $set: { profilepic: result.secure_url },
        }
      );
      const updatedUser = await User.findOne({ email: req.user?.email });
      // fs.unlinkSync(filePath);
      return res.send(updatedUser);
    
  } catch (err) {
    return res.status(304).send(err);
  }
};
