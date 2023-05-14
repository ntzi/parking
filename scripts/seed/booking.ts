import { Booking } from "../../src/api/models/booking.js";

export class BookingSeeder {
	constructor() {
		// Do nothing
	}

	private data = () => {
		return [
			{
				startTime: new Date("2023-06-10 18:00"),
				endTime: new Date("2023-06-10 19:00"),
				parkingSpotId: 1,
				userId: 1,
			},
			{
				startTime: new Date("2023-07-10 10:00"),
				endTime: new Date("2023-07-10 12:00"),
				parkingSpotId: 1,
				userId: 2,
			},
			{
				startTime: new Date("2023-06-10 18:00"),
				endTime: new Date("2023-06-10 19:00"),
				parkingSpotId: 2,
				userId: 1,
			},
		];
	};

	private records = () => {
		const bookings: Booking[] = [];

		this.data().map((booking) => {
			const newBooking: Booking = new Booking();
			newBooking.startTime = booking.startTime
			newBooking.endTime = booking.endTime;
			newBooking.parkingSpotId = booking.parkingSpotId;
			newBooking.userId = booking.userId;
			bookings.push(newBooking);
		});

		return bookings;
	};

	public seed = async () => {
		try {
			await Booking.save(this.records());
		} catch (err) {
			console.error(err);
		}
	};
}
