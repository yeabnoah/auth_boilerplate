import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: false,
      minlength: 2,
      maxlength: 32,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      unique: true,
    },
    emailActivated: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
      // required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    twoFactorAuth: {
      type: [String],
      enum: ["email", "phoneNo"],
      default: [],
    },

    githubId: {
      type: String,
    },

    googleId: {
      type: String,
    },

    activeSessions: {
      type: [
        {
          deviceIp: String,
          deviceOs: String,
          userName: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
