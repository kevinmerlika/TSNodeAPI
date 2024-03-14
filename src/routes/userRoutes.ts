import express from 'express';
const router = express.Router();
import { injectUserDependencies } from '../dependencies/userDependencies';
import { authenticateJWT, authenticateUser } from '../middlewares/passport';
import { generateToken } from '../middlewares/jws';


const userController = injectUserDependencies();

router.get('/:email', userController.getUserByEmail.bind(userController));
router.post('/configurations', authenticateJWT ,userController.getUserConfigurations.bind(userController));
// Login endpoint
router.post('/login', (req, res, next) => {
    authenticateUser(req, res, (err) => {
        if (err) {
            return next(err);
        }
        const token = generateToken(req.user); // Generate token for authenticated user
        const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000); // One day from now
        res.cookie('token', token, { 
            httpOnly: true, 
            sameSite: 'strict',
            expires: oneDayFromNow // Set expiration time for the cookie
        }); 
        res.status(200).send(); // Send response with status 200
    });
});




export default router;
