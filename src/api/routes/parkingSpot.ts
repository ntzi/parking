import { Router } from 'express';

import { create, getAll, getOne, remove, updateOne } from '../controllers/parkingSpot.js';
import isAuthenticated from '../middleware/auth/authenticated.js';
import isAuthorized from '../middleware/auth/authorized.js';
import { validate } from '../validators/requestValidator.js';
import {
	createSchema,
	getAllSchema,
	getOneSchema,
	updateOneSchema,
	removeSchema,
} from '../validators/schemas/parkingSpot.js';
import { Roles } from '../types/auth/authorized.js';

const router = Router();

router.get(
	'/parking-spot/:id',
	validate(getOneSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	getOne,
);

router.get(
	'/parking-spot/',
	validate(getAllSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	getAll,
);

router.post(
	'/parking-spot/',
	validate(createSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	create,
);

router.put(
	'/parking-spot/:id',
	validate(updateOneSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	updateOne,
)

router.delete(
	'/parking-spot/:id',
	validate(removeSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	remove,
);

export default router;
