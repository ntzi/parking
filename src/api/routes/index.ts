import { Router } from 'express';

import userRoutes from '../routes/user.js';
import parkingSpotRoutes from '../routes/parkingSpot.js';
import bookingRoutes from '../routes/booking.js';

const rootRouter = Router();

rootRouter.use('/api', userRoutes);
rootRouter.use('/api', parkingSpotRoutes);
rootRouter.use('/api', bookingRoutes);

export default rootRouter;
