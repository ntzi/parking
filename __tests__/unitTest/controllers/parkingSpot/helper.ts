import { ParkingSpot } from "../../../../src/api/models/parkingSpot.js";

const createParkingSpots = async () => {
	const data = [
		{
			name: "A1",
		},
		{
			name: "A2",
		},
		{
			name: "A3",
		},
		{
			name: "A4",
		},
	];

	const parkingSpots: ParkingSpot[] = [];
	data.map((parkingSpot) => {
		const newParkingSpot: ParkingSpot = new ParkingSpot();
		newParkingSpot.name = parkingSpot.name;
		parkingSpots.push(newParkingSpot);
	});

	try {
		await ParkingSpot.save(parkingSpots);
	} catch (err) {
		console.error(err);
	}

	return parkingSpots;
};

export { createParkingSpots };
