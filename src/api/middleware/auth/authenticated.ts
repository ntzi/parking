import config from "../../../config/config.js";
import { User } from "../../models/user.js";
import { verify } from "../../services/jwToken.js";
import { RequestI, ResponseI } from "../../types/responses/responsesTypes.js";
import { NextFunction } from "express";

const authenticate = (req: RequestI, res: ResponseI, next: NextFunction) => {
	let token;

	if (req.headers && req.headers.authorization) {
		token = req.headers.authorization
		if (token.length <= 0) {
			return res.unauthorized();
		}
		token = token.split('Bearer ')[1];
	} else {
		return res.unauthorized(
			{},
			"No Authorization header (token) was found"
		);
	}

	return verify(token, async (err, token) => {
		if (err) {
			return res.unauthorized("Invalid Token!");
		}
		// const { nodeEnv } = config;
		// const id = nodeEnv === "local" ? 1 : token.id;
		const id = token.id;

		const userRecord: User | null = await User.findOne({ where: { id } });
		if (!userRecord) {
			return res.unauthorized({}, "User does not exist in DB")
		}
		req.user = userRecord || undefined;

		return next();
	});
};

export default authenticate;
