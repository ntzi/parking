import { ParkingSpot } from "../../src/api/models/parkingSpot.js";

export class ParkingSpotSeeder {
	constructor() {
		// Do nothing
	}

	private data = () => {
		return [
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
	};

	private records = () => {
		const parkingSpots: ParkingSpot[] = [];

		this.data().map((parkingSpot) => {
			const newParkingSpot: ParkingSpot = new ParkingSpot();
			newParkingSpot.name = parkingSpot.name;
			parkingSpots.push(newParkingSpot);
		});

		return parkingSpots;
	};

	public seed = async () => {
		try {
			await ParkingSpot.save(this.records());
		} catch (err) {
			console.error(err);
		}
	};
}
