import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserController } from '../controllers/userController';
import { injectUserDependencies } from '../dependencies/userDependencies';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const userController = injectUserDependencies();

passport.use(new LocalStrategy(
    async (username: string, password: string, done) => {
        try {
            const user = await userController.userService.getUserByEmail(username);
            if (!user) {                
                return done(null, false);
            }
            console.log(`user found ${user?.email} and ${password}`);

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Middleware to handle user authentication
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {

        console.log(req.body);
        
        
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(user);
            
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.user = user; // Attach user object to request
        next(); // Proceed to next middleware
    })(req, res, next);
};

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    console.log(req.cookies);
    
    const token = req.cookies.token; // Get token from cookie

    if (token) {
        const JWT_SECRET: any = process.env.JWT_SECRET;
        

        jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired.' });
                } else {
                    return res.status(403).json({ message: 'Failed to authenticate token.' });
                }
            } else {
                req.user = decoded; // Attach the decoded user information to the request object
                if(decoded.userId != req.body.id){
                    console.log(decoded.userId);
                    console.log(req.body.id);
                    
                    
                    return res.status(405).json({ message: 'Wrong User' });
                }
                console.log(decoded);
                console.log('Issued At:', new Date(decoded.iat * 1000).toLocaleString());
                console.log('Expires At:', new Date(decoded.exp * 1000).toLocaleString());
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'No token provided.' });
    }
}


export default router;
