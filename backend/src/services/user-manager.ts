import { getManager, Repository } from 'typeorm';

import { User } from '../models';
import { UserPayload } from '../lib/types';

/**
 * Provides an abstraction for all user operations
 */
export interface UserManager {
    isExistingEmail(email: string): Promise<boolean>;
    createUser(
        fullName: string,
        email: string,
        password: string
    ): Promise<User>;
    findUserByEmail(email: string): Promise<User | undefined>;
    generateUserPayload(user: User): UserPayload;
}

export class UserManagerService implements UserManager {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getManager().getRepository(User);
    }

    async isExistingEmail(email: string) {
        const user = await this.userRepository.findOne({ email });

        return !!user;
    }

    async createUser(fullName: string, email: string, password: string) {
        const user = new User();
        user.fullName = fullName;
        user.email = email;
        user.password = password;

        await this.userRepository.save(user);

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });

        return user;
    }

    generateUserPayload(user: User) {
        return { id: user.id, fullName: user.fullName, email: user.email };
    }
}
