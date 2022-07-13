import Joi from "joi";

export const schema = {
    email: Joi.string().required().email({tlds: {allow: false}}).label('Email'),
    password: Joi.string().required().min(8).label('Password'),
    name: Joi.string().required().pattern(/^[a-zA-Z\s]*$/).label('Name'),
    role: Joi.string().required().label('You are')
}