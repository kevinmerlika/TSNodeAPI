import { User } from '../entities/user/user';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}