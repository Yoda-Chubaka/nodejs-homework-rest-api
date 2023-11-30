import { Schema, model } from "mongoose";
import Joi from 'joi';
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const userSchema = new Schema({
    password: {
        type: String,
        minlength: 5,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
        type: String,
        require: true
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    token: String
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);
userSchema.post("findOneAndUpdate", handleMongooseError);

export const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

export const verifyEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

export const patchSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required()
});

export const User = model('user', userSchema);