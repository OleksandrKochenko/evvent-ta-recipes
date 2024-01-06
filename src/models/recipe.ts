import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    area: String,
    instructions: { type: String, required: true },
    description: String,
    thumb: String,
    preview: String,
    time: { type: String, required: true },
    youtube: String,
    tags: [],
    ingredients: {
      type: [
        {
          id: { type: Schema.Types.ObjectId, ref: "ingredient" },
          measure: String,
        },
      ],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    favorite: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { versionKey: false, timestamps: true }
);

export const Recipe = model("recipe", recipeSchema);
