import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

export const Category = model("category", categorySchema);
