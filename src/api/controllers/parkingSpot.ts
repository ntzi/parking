import { ParkingSpot } from "../models/parkingSpot.js";
import {
	CreateHandler,
	CreateReq,
	CreateResData,
	GetAllHandler,
	GetAllReq,
	GetAllResData,
	GetOneHandler,
	GetOneReq,
	GetOneResData,
	RemoveHandler,
	RemoveReq,
	RemoveResData,
	UpdateOneHandler,
	UpdateOneReq,
	UpdateOneResData,
} from "../types/controller/parkingSpotTypes.js";
import { RequestI, ResponseI } from "../types/responses/responsesTypes.js";
import { validateResData } from "../validators/responseDataValidator.js";
import {
	createResData,
	getAllResData,
	getOneResData,
	removeResData,
	updateOneResData,
} from "../validators/schemas/response/parkingSpot.js";
import { RequestHandler } from "express";

const getOne: GetOneHandler = async (req: GetOneReq, res: ResponseI) => {
	try {
		const { id } = req.params;
		const parkingSpot = await ParkingSpot.findOne({
			where: { id },
		});
		const resData = validateResData<GetOneResData>(
			parkingSpot,
			getOneResData
		);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const getAll: GetAllHandler = async (_req: GetAllReq, res: ResponseI) => {
	try {
		const parkingSpots = await ParkingSpot.find();
		const resData = validateResData<GetAllResData>(
			parkingSpots,
			getAllResData
		);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const create: CreateHandler = async (req: CreateReq, res: ResponseI) => {
	try {
		const { body } = req;
		const exists = await ParkingSpot.findOne({
			where: { name: body.name },
		});

		if (exists) {
			return res.badRequest(exists, "Parking spot already exists");
		}
		const newParkingSpot = new ParkingSpot();
		newParkingSpot.name = body.name;

		const parkingSpot = await ParkingSpot.save(newParkingSpot);
		const resData = validateResData<CreateResData>(
			parkingSpot,
			createResData
		);
		return res.created(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const updateOne: UpdateOneHandler = async (
	req: UpdateOneReq,
	res: ResponseI
) => {
	try {
		const {
			params: { id },
			body,
		} = req;

		const result = await ParkingSpot.update(id, body);
		if (result.affected === 0) {
			return res.badRequest(`Record with id: ${id} does not exist.`);
		}

		const resData = validateResData<UpdateOneResData>(
			result,
			updateOneResData
		);
		return res.created(resData, "Updated");
	} catch (err) {
		return res.serverError(err);
	}
};

const remove: RemoveHandler = async (req: RemoveReq, res: ResponseI) => {
	try {
		const { id } = req.params;
		const parkingSpots = await ParkingSpot.delete(id);

		const resData = validateResData<RemoveResData>(
			parkingSpots,
			removeResData
		);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

export { getOne, getAll, create, updateOne, remove };
