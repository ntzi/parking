import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn, Relation, ManyToOne } from 'typeorm';
import { User } from './user.js';
import { ParkingSpot } from './parkingSpot.js';

@Entity()
export class Booking extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	
	@Column('timestamptz')
	startTime!: Date;

	@Column('timestamptz')
	endTime!: Date;

	/*
		Relations
	*/
	@ManyToOne(() => User, (user) => user.bookings, {
        cascade: true,
    })
	user!: Relation<User>
	@Column('int', { nullable: true })
	userId!: number

	@ManyToOne(() => ParkingSpot, (parkingSpot) => parkingSpot.bookings, {
        cascade: true,
    })
	parkingSpot!: Relation<ParkingSpot>
	@Column('int', { nullable: true })
	parkingSpotId!: number

	/*
		Create/Update Dates
	*/
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
	
}