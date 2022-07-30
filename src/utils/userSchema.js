import Joi from "joi";

export const registerSchema = {
    email: Joi.string().required().email({tlds: {allow: false}}).label('Email'),
    password: Joi.string().required().min(8).label('Password'),
    name: Joi.string().required().label('Name'),
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

export const profileSchema = {
    studentCode: Joi.string().required().label('Student Code'),
    class: Joi.string().required().label('Class'),
    name: Joi.string().required().label('Name'),
    faculty: Joi.string().required().label("Faculty"),
    gender: Joi.boolean().label("Gender"),
    email: Joi.string().required().email({tlds: {allow: false}}).label('Email')
}

export const postSchema = {
    header: Joi.string().required(),
    text: Joi.string().required(),
    userId: Joi.string().required(),
    mediaUrl: Joi.array()
}