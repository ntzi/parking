import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, Relation, OneToMany } from 'typeorm';
import { Booking } from './booking.js';

@Entity()
export class ParkingSpot extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar', { length: 100, unique: true })
	name!: string;

	/*
		Relations
	*/
	@OneToMany(() => Booking, (booking) => booking.parkingSpot)
	bookings!: Relation<Booking[]>


	/*
		Create/Update Dates
	*/
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
