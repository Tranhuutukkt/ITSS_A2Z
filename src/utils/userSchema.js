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

export const profileList = [
    {label: 'email', icon: 'fa-solid fa-envelope', name: 'Email' },
    {label: 'class', icon: 'fa-solid fa-graduation-cap', name: 'Class'},
    {label: 'gender', icon: 'fa-solid fa-user', name: 'Gender'},
    {label: 'faculty', icon: 'fa-solid fa-graduation-cap', name: 'Faculty'},
    {label: 'role', icon: 'fa-solid fa-dice-d6', name: 'Role'},
    {label: 'studentCode', icon: 'fa-solid fa-id-card', name: 'Student code'}
];