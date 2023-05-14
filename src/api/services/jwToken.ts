import config from "../../config/config.js";
import jwt from "jsonwebtoken";

const tokenSecret = config.auth.privateKey;

const issue = (payload) => {
	return jwt.sign(payload, tokenSecret, {
		expiresIn: "30 days",
	});
};

const verify = (token, callback) => {
	return jwt.verify(token, tokenSecret, {}, callback);
};

export { issue, verify };
