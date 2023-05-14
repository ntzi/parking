import { Booking } from "../models/booking.js";

export const isParkingSpotAvailable = async (
	parkingSpotId: number,
	startTime: Date,
	endTime: Date
): Promise<boolean> => {
	const conflictingBooking = await Booking.createQueryBuilder("booking")
		.where("booking.parkingSpotId = :parkingSpotId", { parkingSpotId })
		.andWhere("booking.startTime < :endTime", { endTime })
		.andWhere("booking.endTime > :startTime", { startTime })
		.getOne();

	return conflictingBooking ? false : true;
};
