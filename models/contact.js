import { Schema, model } from "mongoose";
import Joi from 'joi';
import { handleMongooseError } from "../helpers/handleMongooseError.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);
// contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleMongooseError);

export const addSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required name field`,
        }),
    phone: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required phone field`,
        }),
    email: Joi.string()
        .required()
        .messages({
            'any.required': `Missing required email field`,
        })
})

export const putSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
}).or("name", "email", "phone");

export const patchSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        'any.required': `Missing field favorite`,
    }),
});

export const Contact = model('contact', contactSchema);