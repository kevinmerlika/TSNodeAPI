import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {

    console.log("worked");
    console.log("sending response");
    
    res.status(200).json({ error: 'Method Not Allowed' });
});
export default router;
