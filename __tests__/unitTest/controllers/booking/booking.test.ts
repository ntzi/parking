import app from "../../../../src/api/loaders/appLoader.js";
import {
	AppDataSource,
	postgresClose,
	postgresLoad,
} from "../../../../src/api/loaders/dbLoader.js";
import { Booking } from "../../../../src/api/models/booking.js";
import { ParkingSpot } from "../../../../src/api/models/parkingSpot.js";
import { User } from "../../../../src/api/models/user.js";
import { Roles } from "../../../../src/api/types/auth/authorized.js";
import { deleteAllRecords } from "../helper.js";
import { createParkingSpots } from "../parkingSpot/helper.js";
import { createUsers, getAdminToken } from "../user/helper.js";
import test from "ava";
import supertest from "supertest";

let apiRequest;

test.before(async () => {
	await postgresLoad();
	apiRequest = supertest(app);

	await createUsers();
	await createParkingSpots();
});

test.after(async () => {
	await deleteAllRecords();
	await postgresClose();
});

test.afterEach(async () => {
	await AppDataSource.getRepository(Booking).delete({});
});

test("create: success", async (t) => {
	const endpoint = `/api/booking`;
	const [parkingSpot] = await ParkingSpot.find();
	const body = {
		startTime: "2023-06-10 18:00",
		endTime: "2023-06-10 19:00",
		parkingSpotId: parkingSpot.id,
	};

	const token = await getAdminToken();

	const response = await apiRequest
		.post(endpoint)
		.set({ Authorization: `Bearer ${token}` })
		.send(body);

	t.is(response.status, 201);

	const booking = await Booking.findOne({
		where: { id: response.body.data.id },
	});

	t.is(booking?.id, response.body.data.id);
});

test("update: success", async (t) => {
	const parkingSpots = await ParkingSpot.find();
	const user = await User.findOne({ where: { role: Roles.ADMIN } });

	const startTime = new Date("2023-06-10 18:00");
	const endTime = new Date("2023-06-10 19:00");

	// Create a booking
	const newBooking = new Booking();
	newBooking.startTime = startTime;
	newBooking.endTime = endTime;
	newBooking.parkingSpotId = parkingSpots[0].id;
	newBooking.userId = user?.id as number;
	const booking = await Booking.save(newBooking);

	const endpoint = `/api/booking/${booking.id}`;

	const token = await getAdminToken();

	// update the booking
	const body = {
		startTime,
		endTime,
		parkingSpotId: parkingSpots[1].id,
	};

	const response = await apiRequest
		.put(endpoint)
		.set({ Authorization: `Bearer ${token}` })
		.send(body);

	t.is(response.status, 201);

	// Get the updated booking
	const updatedBooking = await Booking.findOne({
		where: { id: response.body.data.id },
	});

	t.is(updatedBooking?.parkingSpotId, parkingSpots[1].id);
});
