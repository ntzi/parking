import { RequestI, ResponseI } from "../../types/responses/responsesTypes";
import { NextFunction } from "express";

export const checkOwnership =
	(checkFn: (req: RequestI) => Promise<boolean>) =>
	async (req: RequestI, res: ResponseI, next: NextFunction) => {
		try {
			const isOwner = await checkFn(req);

			if (!isOwner) {
				return res
					.status(403)
					.json({ message: "Forbidden: Access denied" });
			}

			return next();
		} catch (error) {
			return res.status(500).json({ message: "Server error" });
		}
	};
