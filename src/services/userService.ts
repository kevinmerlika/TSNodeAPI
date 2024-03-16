import { UserRepository } from '../repositories/userRepository';
import { User } from '../entities/user/user';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';

export class UserService {
    constructor(private userRepositoryImpl: UserRepositoryImpl) {        
    }

    async getUserByEmail(email: string): Promise<User | null> {
        console.log(email);
        
        return this.userRepositoryImpl.findByEmail(email);
    }

    async getUserConfigurations(userId: string){
        return this.userRepositoryImpl.getUserConfigurations(userId)
    }
}
