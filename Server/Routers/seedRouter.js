import express from 'express';
import { fetchAllSeedData, getAllSeedController, selectedMonthSeedDataController } from '../Controllers/seedController.js';

const seedRouter = express.Router();

seedRouter.get('/create', getAllSeedController);
seedRouter.get('/get-all', fetchAllSeedData);
seedRouter.get('/monthly-data', selectedMonthSeedDataController);

export default seedRouter;