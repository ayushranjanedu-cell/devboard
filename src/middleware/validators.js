import { body } from "express-validator";

export const registerValidator=[
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:2,max:50})
    .withMessage('Name must be between 2 and 50 characters'),

    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min:6})
    .withMessage('Password must be atleast 6 characters')
];

export const loginValidator = [
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const taskValidator = [
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({min:1, max:50})
    .withMessage('Title must be between 1 and 50 characters'),

    body('status')
    .optional()
    .isIn(['todo','in-progress','done'])
    .withMessage('Status must be todo,in-progress, or done')
];