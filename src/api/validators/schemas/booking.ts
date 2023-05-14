import { RequestSchema } from "../../types/validators/validatorTypes";
import Joi from "joi";

const getOneSchema = (): RequestSchema => {
	return Joi.object({
		params: {
			id: Joi.number().required(),
		},
		query: {},
		body: {},
	});
};

const getAllSchema = (): RequestSchema => {
	return Joi.object({
		params: {},
		query: {},
		body: {},
	});
};

const createSchema = (): RequestSchema => {
	return Joi.object({
		params: {},
		query: {},
		body: {
			startTime: Joi.date().required(),
			endTime: Joi.date().required(),
			parkingSpotId: Joi.number().required(),
		},
	});
};

const updateOneSchema = (): RequestSchema => {
	return Joi.object({
		params: {
			id: Joi.number().required(),
		},
		query: {},
		body: {
			startTime: Joi.date().required(),
			endTime: Joi.date().required(),
			parkingSpotId: Joi.number().required(),
		},
	});
};

const removeSchema = (): RequestSchema => {
	return Joi.object({
		params: {
			id: Joi.number().required(),
		},
		query: {},
		body: {},
	});
};

export {
	getOneSchema,
	getAllSchema,
	createSchema,
	updateOneSchema,
	removeSchema,
};
