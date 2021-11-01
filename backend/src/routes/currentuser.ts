import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../lib/errors';
import { UserPayload } from '../lib/types';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    let currentUser: UserPayload | {} = {};

    if (req.session && req.session.jwt) {
        try {
            currentUser = jwt.verify(
                req.session.jwt,
                process.env.JWT_KEY!
            ) as UserPayload;
        } catch (err) {
            throw new BadRequestError('JWT could not be verified');
        }
    }

    res.send({ currentUser });
});

export { router as currentUserRouter };
