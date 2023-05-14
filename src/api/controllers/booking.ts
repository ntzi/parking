import { Booking } from "../models/booking.js";
import { isParkingSpotAvailable } from "../services/availability.js";
import { Roles } from "../types/auth/authorized.js";
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
} from "../types/controller/bookingTypes.js";
import { ResponseI } from "../types/responses/responsesTypes.js";
import { validateResData } from "../validators/responseDataValidator.js";
import {
	createResData,
	getAllResData,
	getOneResData,
	removeResData,
	updateOneResData,
} from "../validators/schemas/response/booking.js";
import dayjs from "dayjs";

const getOne: GetOneHandler = async (req: GetOneReq, res: ResponseI) => {
	try {
		const { id } = req.params;
		const booking = await Booking.findOne({
			where: { id },
		});
		const resData = validateResData<GetOneResData>(booking, getOneResData);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const getAll: GetAllHandler = async (req: GetAllReq, res: ResponseI) => {
	try {
		const {
			user: { role, id: userId },
		} = req;
		let query = {};
		if (role === Roles.USER) {
			query = { where: { userId } };
		}

		const bookings = await Booking.find(query);

		const resData = validateResData<GetAllResData>(bookings, getAllResData);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

const create: CreateHandler = async (req: CreateReq, res: ResponseI) => {
	try {
		const {
			body: { startTime, endTime, parkingSpotId },
		} = req;

		if (!dayjs(startTime).isBefore(endTime)) {
			return res.badRequest({}, "Start time must be before end time");
		}

		const isAvailable = await isParkingSpotAvailable(
			parkingSpotId,
			startTime,
			endTime
		);

		if (!isAvailable) {
			return res.badRequest({}, "Parking spot is not available");
		}
		const newBooking = new Booking();
		newBooking.startTime = startTime;
		newBooking.endTime = endTime;
		newBooking.parkingSpotId = parkingSpotId;
		newBooking.userId = req.user.id;
		const booking = await Booking.save(newBooking);

		// TODO: Improve error handling on non-existing parkingSpotId

		const resData = validateResData<CreateResData>(booking, createResData);
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
			body: { startTime, endTime, parkingSpotId },
		} = req;

		if (!dayjs(startTime).isBefore(endTime)) {
			return res.badRequest({}, "Start time must be before end time");
		}

		const isAvailable = await isParkingSpotAvailable(
			parkingSpotId,
			startTime,
			endTime
		);

		if (!isAvailable) {
			return res.badRequest({}, "Parking spot is not available");
		}

		const result = await Booking.update(id, {
			startTime,
			endTime,
			parkingSpotId,
		});

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
		const bookings = await Booking.delete(id);

		const resData = validateResData<RemoveResData>(bookings, removeResData);
		return res.ok(resData);
	} catch (err) {
		return res.serverError(err);
	}
};

export { getOne, getAll, create, updateOne, remove };
