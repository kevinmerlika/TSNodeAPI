import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {

     public constructor(public userService: UserService) {
        console.log("user service created");
        
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        try {
            console.log(email);
            
            
            const user = await this.userService.getUserByEmail(email);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error: any) { 
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getUserConfigurations(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        try {
            console.log(id);
            
            
            const user = await this.userService.getUserConfigurations(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'No config' });
            }
        } catch (error: any) { 
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}