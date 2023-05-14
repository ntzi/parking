import { logIn, getOne } from "../controllers/user.js";
import isAuthenticated from "../middleware/auth/authenticated.js";
import isAuthorized from "../middleware/auth/authorized.js";
import { isUserOwner } from "../middleware/auth/ownershipChecks.js";
import { Roles } from "../types/auth/authorized.js";
import { validate } from "../validators/requestValidator.js";
import { getOneSchema, logInSchema } from "../validators/schemas/user.js";
import { Router } from "express";

const router = Router();

router.post("/users/login", validate(logInSchema), logIn);
router.get(
	"/users/:id",
	validate(getOneSchema),
	isAuthenticated,
	isAuthorized({ hasRole: [Roles.ADMIN], ownership: isUserOwner }),
	getOne
);

export default router;
