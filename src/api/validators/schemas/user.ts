import { RequestSchema } from "../../types/validators/validatorTypes";
import Joi from "joi";

const logInSchema = (): RequestSchema => {
	return Joi.object({
		params: {},
		query: {},
		body: {
			email: Joi.string().email().required(),
		},
	});
};

const getOneSchema = (): RequestSchema => {
	return Joi.object({
		params: {
			id: Joi.number().required(),
		},
		query: {},
		body: {},
	});
};

export { logInSchema, getOneSchema };
