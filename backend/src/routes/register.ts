import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../lib/middlewares';
import { BadRequestError } from '../lib/errors';
import {
    UserManager,
    UserManagerService,
    PasswordManager,
    PasswordManagerService
} from '../services';

const router = express.Router();

const validationRules = [
    body('fullName')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Fullname must be atleast 5 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*-]{8,}$/)
        .withMessage(
            'Password must be atleast 8 characters and must contain atleast a digit and a character'
        )
];

router.post(
    '/api/users/register',
    validationRules,
    validateRequest,
    async (req: Request, res: Response) => {
        const { fullName, email, password } = req.body;

        const userManager: UserManager = new UserManagerService();
        const passwordManager: PasswordManager = new PasswordManagerService();

        // Reject the request if email is already in use
        const isExistingEmail = await userManager.isExistingEmail(email);
        if (isExistingEmail) {
            throw new BadRequestError('Email already in use');
        }

        // Hash the password
        const hashedPassword = await passwordManager.toHash(password);

        // Create the new user
        const user = await userManager.createUser(
            fullName,
            email,
            hashedPassword
        );

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                fullName: user.fullName,
                email: user.email
            },
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(userManager.generateUserPayload(user));
    }
);

export { router as registrationRouter };
