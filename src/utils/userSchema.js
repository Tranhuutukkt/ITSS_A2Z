import Joi from "joi";

export const registerSchema = {
    email: Joi.string().required().email({tlds: {allow: false}}).label('Email'),
    password: Joi.string().required().min(8).label('Password'),
    name: Joi.string().required().pattern(/^[a-zA-Z\s]*$/).label('Name'),
    role: Joi.string().required().label('You are')
}

export const loginSchema = {
    email: Joi.string().required().email({tlds: {allow: false}}).label('Email'),
    password: Joi.string().required().min(8).label('Password')
}