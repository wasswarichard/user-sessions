import { ConnectionOptions } from 'typeorm';

import { User } from './models';

let typeOrmConfig: ConnectionOptions = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: [User]
};

if (process.env.NODE_ENV === 'production') {
    typeOrmConfig = {
        ...typeOrmConfig,
        ssl: { rejectUnauthorized: false }, // Required for Heroku
        url: process.env.DATABASE_URL // Obtained from Heroku env variable
    };
} else {
    typeOrmConfig = {
        ...typeOrmConfig,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    };
}

export { typeOrmConfig };
