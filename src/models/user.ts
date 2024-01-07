import { Schema, model } from "mongoose";
import { messageRequired, userEmailRegExp } from "../helpers/constants";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, messageRequired] },
    email: {
      type: String,
      match: userEmailRegExp,
      unique: true,
      required: [true, messageRequired],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, messageRequired],
    },
    avatarURL: {
      type: String,
    },
    token: { type: String },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = model("user", userSchema);
