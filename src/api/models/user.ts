import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, Relation, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Roles } from '../types/auth/authorized.js';
import { Booking } from './booking.js';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	role!: Roles;

	@Column('varchar', { unique: true, nullable: true })
	email!: string;

	@Column('varchar', { length: 100 })
	name!: string;


	/*
		Relations
	*/
	@OneToMany(() => Booking, (booking) => booking.id)
	bookings!: Relation<Booking[]>


	/*
		Create/Update Dates
	*/
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

}
