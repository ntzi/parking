import { Opts } from "../../types/auth/authorized";
import { RequestI, ResponseI } from "../../types/responses/responsesTypes";
import { NextFunction } from "express";

const isAuthorized =
	(opts: Opts) =>
	async (req: RequestI, res: ResponseI, next: NextFunction) => {
		const { role } = req.user;

		let isOwner = false;
		if (opts.ownership) {
			try {
				isOwner = await opts.ownership(req);
			} catch (err) {
				return res.serverError(err);
			}
		}

		const isAllowed = opts.hasRole.includes(role);

		if (!isOwner && !isAllowed) {
			return res.forbidden(
				"",
				`User with role '${role}' is not included in the allowed roles: [${opts.hasRole}] ` +
					"and user is not the owner of the resource."
			);
		}

		return next();
	};

export default isAuthorized;
