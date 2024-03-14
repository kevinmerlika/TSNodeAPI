import express from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';
import { ConnectionManager } from '../connections/connectionManager';

const router = express.Router();

function setupUserRoute() {
    const connectionManager = ConnectionManager.getInstance();
    const connect = connectionManager.getConnection();
    const userRepository: UserRepositoryImpl = UserRepositoryImpl.getInstance(connect);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    console.log("usercontroller");
    console.log(userController);
    
    

    console.log("setting up injections");
    
    router.get('/:email', userController.getUserByEmail.bind(userController));
}

setupUserRoute();

export default router;
