import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { RouteNotFoundError } from './lib/errors';
import { errorHandler } from './lib/middlewares';
import {
    registrationRouter,
    loginRouter,
    logoutRouter,
    currentUserRouter
} from './routes';

dotenv.config();

const app = express();
app.set('trust proxy', true);

const corsOptions = {
    origin: process.env.REACT_APP_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(json());
app.use(
    cookieSession({
        signed: false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    })
);

app.use(registrationRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(currentUserRouter);

app.all('*', async () => {
    throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
