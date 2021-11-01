import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../lib/errors';
import {
    UserManager,
    UserManagerService,
    PasswordManager,
    PasswordManagerService
} from '../services';

const router = express.Router();

router.post('/api/users/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userManager: UserManager = new UserManagerService();
    const passwordManager: PasswordManager = new PasswordManagerService();

    // Verify email
    const existingUser = await userManager.findUserByEmail(email);
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    // Verify password
    const passwordsMatch = await passwordManager.compare(
        existingUser.password,
        password
    );
    if (!passwordsMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            fullName: existingUser.fullName,
            email: existingUser.email
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(userManager.generateUserPayload(existingUser));
});

export { router as loginRouter };
