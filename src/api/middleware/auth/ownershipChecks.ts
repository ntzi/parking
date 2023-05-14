import { Booking } from "../../models/booking.js";
import { RequestI } from "../../types/responses/responsesTypes";

export const isBookingOwner = async (req: RequestI): Promise<boolean> => {
	const userId = req.user.id;
	const id = Number(req.params.id);

	const booking = await Booking.findOne({ where: { id, userId } });

	return booking ? true : false;
};

export const isUserOwner = async (req: RequestI): Promise<boolean> => {
	const userId = req.user.id;
	const id = Number(req.params.id);


	return userId === id ? true : false;
};