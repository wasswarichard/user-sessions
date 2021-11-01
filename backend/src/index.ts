import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { app } from './app';
import { typeOrmConfig } from './typeormconfig';

(async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await createConnection(typeOrmConfig);

        console.log('Connected to Postgres DB');

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
})();
