"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, constants_1.messageRequired] },
    email: {
        type: String,
        match: constants_1.userEmailRegExp,
        unique: true,
        required: [true, constants_1.messageRequired],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, constants_1.messageRequired],
    },
    avatarURL: {
        type: String,
    },
    token: { type: String },
    verify: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });
exports.User = (0, mongoose_1.model)("user", userSchema);
