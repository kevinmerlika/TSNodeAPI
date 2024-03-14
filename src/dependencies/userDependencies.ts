// dependencyInjector.ts
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';
import { ConnectionManager } from '../connections/connectionManager';

export function injectUserDependencies() {
    const connectionManager = ConnectionManager.getInstance();
    const connect = connectionManager.getConnection();
    const userRepository: UserRepositoryImpl = UserRepositoryImpl.getInstance(connect);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
}
