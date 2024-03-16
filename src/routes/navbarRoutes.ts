import express from 'express';
import { injectWebDependencies } from '../dependencies/webConfigDependencies';

const router = express.Router();
const webControllers = injectWebDependencies();

// Define your endpoint
router.get('/getWebConfigs/:userId', webControllers.getWebConfigs.bind(webControllers));

export default router;