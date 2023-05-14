import { User } from "../models/user.js";
import { issue } from "../services/jwToken.js";
import {
	GetOneHandler,
	GetOneReq,
	GetOneResData,
	LoginHandler,
	LoginReq,
	LoginResData,
} from "../types/controller/userTypes.js";
import { ResponseI } from "../types/responses/responsesTypes.js";
import { validateResData } from "../validators/responseDataValidator.js";
import {
	getOneResData,
	loginResData,
} from "../validators/schemas/response/user.js";

const logIn: LoginHandler = async (req: LoginReq, res: ResponseI) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.badRequest({}, "User does not exist");
		}
		const data = {
			token: issue({ id: user?.id }),
		};

		const resData = validateResData<LoginResData>(data, loginResData);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const getOne: GetOneHandler = async (req: GetOneReq, res: ResponseI) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id } });
		const resData = validateResData<GetOneResData>(user, getOneResData);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

export { logIn, getOne };
