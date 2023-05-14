import {
	create,
	getAll,
	getOne,
	remove,
	updateOne,
} from "../controllers/booking.js";
import isAuthenticated from "../middleware/auth/authenticated.js";
import isAuthorized from "../middleware/auth/authorized.js";
import { isBookingOwner } from "../middleware/auth/ownershipChecks.js";
import { Roles } from "../types/auth/authorized.js";
import { validate } from "../validators/requestValidator.js";
import {
	createSchema,
	getAllSchema,
	getOneSchema,
	updateOneSchema,
	removeSchema,
} from "../validators/schemas/booking.js";
import { Router } from "express";

const router = Router();

router.get(
	"/booking/:id",
	validate(getOneSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN], ownership: isBookingOwner }),
	getOne
);

router.get(
	"/booking/",
	validate(getAllSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	getAll
);

router.post(
	"/booking/",
	validate(createSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN, Roles.USER] }),
	create
);

router.put(
	"/booking/:id",
	validate(updateOneSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN], ownership: isBookingOwner }),
	updateOne
);

router.delete(
	"/booking/:id",
	validate(removeSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN], ownership: isBookingOwner }),
	remove
);

export default router;
