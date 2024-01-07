"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
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
                id: { type: String, ref: "ingredient" },
                measure: String,
            },
        ],
        required: true,
    },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    favorite: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "user" }],
}, { versionKey: false, timestamps: true });
exports.Recipe = (0, mongoose_1.model)("recipe", recipeSchema);
