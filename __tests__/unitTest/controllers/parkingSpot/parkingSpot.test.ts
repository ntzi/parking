import app from "../../../../src/api/loaders/appLoader.js";
import {
	AppDataSource,
	postgresClose,
	postgresLoad,
} from "../../../../src/api/loaders/dbLoader.js";
import { ParkingSpot } from "../../../../src/api/models/parkingSpot.js";
import { deleteAllRecords } from "../helper.js";
import { createUsers, getAdminToken } from "../user/helper.js";
import test from "ava";
import supertest from "supertest";

let apiRequest;

test.before(async () => {
	await postgresLoad();
	apiRequest = supertest(app);

	await createUsers();
});

test.after(async () => {
	await deleteAllRecords();
	await postgresClose();
});

test.afterEach(async () => {
	await AppDataSource.getRepository(ParkingSpot).delete({});
});

test("create: success", async (t) => {
	const endpoint = `/api/parking-spot`;
	const body = {
		name: "A1",
	};

	const token = await getAdminToken();

	const response = await apiRequest
		.post(endpoint)
		.set({ Authorization: `Bearer ${token}` })
		.send(body);

	t.is(response.status, 201);

	const parkingSpot = await ParkingSpot.findOne({
		where: { id: response.body.data.id },
	});

	t.is(parkingSpot?.id, response.body.data.id);
});

test("update: success", async (t) => {
	// Create a parkingSpot
	const newParkingSpot = new ParkingSpot();
	newParkingSpot.name = "A1";
	const parkingSpot = await ParkingSpot.save(newParkingSpot);

	const endpoint = `/api/parking-spot/${parkingSpot.id}`;

	const token = await getAdminToken();
	const newName = "A2";

	// update the parkingSpot
	const body = {
		name: newName,
	};

	const response = await apiRequest
		.put(endpoint)
		.set({ Authorization: `Bearer ${token}` })
		.send(body);

	t.is(response.status, 201);

	// Get the updated parkingSpot
	const updatedParkingSpot = await ParkingSpot.findOne({
		where: { id: response.body.data.id },
	});

	t.is(updatedParkingSpot?.name, newName);
});
