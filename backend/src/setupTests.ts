import 'reflect-metadata';
import {
    createConnection,
    getManager,
    Repository,
    ConnectionOptions
} from 'typeorm';

import { User } from './models';

let userRepository: Repository<User> | null = null;
let connection;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf2323t2736';
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_DATABASE = 'user_test_db';
    process.env.DB_USERNAME = 'testuser';
    process.env.DB_PASSWORD = '';

    const typeOrmConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: false,
        entities: [User]
    };

    connection = await createConnection(typeOrmConfig);

    userRepository = getManager().getRepository(User);
});

afterEach(async () => {
    await userRepository?.delete({ email: 'test@test.com' });
});

afterAll(async () => {
    // Close DB connection
    await connection.close();
});
