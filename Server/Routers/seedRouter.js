import express from 'express';
import { fetchAllSeedData, getAllSeedController } from '../Controllers/seedController.js';

const seedRouter = express.Router();

seedRouter.post('/create', getAllSeedController);
seedRouter.get('/get-all', fetchAllSeedData);

export default seedRouter;