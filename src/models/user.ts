import { Schema, model } from "mongoose";
import { messageRequires, userEmailRegExp } from "../helpers/constants";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, messageRequires] },
    email: {
      type: String,
      match: userEmailRegExp,
      unique: true,
      required: [true, messageRequires],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, messageRequires],
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
