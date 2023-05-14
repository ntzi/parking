import { NextFunction } from 'express';

import { RequestI, ResponseI } from '../types/responses/responsesTypes.js';

const errorHandler = app => {
	app.use((err, _req: RequestI, res: ResponseI, next: NextFunction) => {		
		if (err.name === 'UnauthorizedError') {
			res.unauthorized();
			console.error(err);
		} else if (err.name === 'InvalidTokenError') {
			res.forbidden();
			console.error(err);
		} else {
			next(err);
		}
	});
};

export default errorHandler;
