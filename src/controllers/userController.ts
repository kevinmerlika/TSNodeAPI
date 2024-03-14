import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {

     public constructor(private userService: UserService) {
        console.log(userService);
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
        } catch (error: any) { // Explicitly type 'error' as 'any' or 'unknown'
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}