import { AppDataSource } from "../../../src/api/loaders/dbLoader.js";
import { Booking } from "../../../src/api/models/booking.js";
import { ParkingSpot } from "../../../src/api/models/parkingSpot.js";
import { User } from "../../../src/api/models/user.js";

const deleteAllRecords = async () => {
	await AppDataSource.getRepository(Booking).delete({});
	await AppDataSource.getRepository(User).delete({});
	await AppDataSource.getRepository(ParkingSpot).delete({});
};

export { deleteAllRecords };
