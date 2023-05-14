import app from "../../../../src/api/loaders/appLoader.js";
import {
	postgresLoad,
	postgresClose,
} from "../../../../src/api/loaders/dbLoader.js";
import { deleteAllRecords } from "../helper.js";
import { createUsers } from "./helper.js";
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

test("login: success", async (t) => {
	const endpoint = `/api/users/login`;
	const body = {
		email: "nikos+admin@parking.app",
	};

	const response = await apiRequest.post(endpoint).send(body);

	t.is(response.status, 200);
	t.is(typeof response.body.data.token, "string");
});
