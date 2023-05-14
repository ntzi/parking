import { postgresClose, postgresLoad } from "../../src/api/loaders/dbLoader.js";
import { BookingSeeder } from "./booking.js";
import { ParkingSpotSeeder } from "./parkingSpot.js";
import { UserSeeder } from "./user.js";

const userSeeder = new UserSeeder();
const parkingSpotSeeder = new ParkingSpotSeeder();
const bookingSeeder = new BookingSeeder();

await postgresLoad();

// Seed all tables
await userSeeder.seed();
await parkingSpotSeeder.seed();
await bookingSeeder.seed();

await postgresClose();
