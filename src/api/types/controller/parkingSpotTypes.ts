import { RequestHandler } from 'express';

import { CustomParams, RequestI } from '../responses/responsesTypes';

/*
 	parkingSpot.getOne()
*/
interface GetOneParams {
	id: number;
}
type GetOneQuery = Record<string, string>;
type GetOneBody = Record<string, string>;

export type GetOneReq = RequestI<
	CustomParams<GetOneParams>,
	GetOneQuery,
	GetOneBody
>;
export type GetOneHandler = RequestHandler<
	CustomParams<GetOneParams>,
	GetOneQuery,
	GetOneBody,
	qs.ParsedQs
>;
export interface GetOneResData {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

/*
 	parkingSpot.getAll()
*/
interface GetAllParams {}
type GetAllQuery = Record<string, string>;
type GetAllBody = Record<string, string>;

export type GetAllReq = RequestI<
	CustomParams<GetAllParams>,
	GetAllQuery,
	GetAllBody
>;
export type GetAllHandler = RequestHandler<
	CustomParams<GetAllParams>,
	GetAllQuery,
	GetAllBody,
	qs.ParsedQs
>;
interface GetAllResDataI {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export type GetAllResData = GetAllResDataI[];

/*
 	parkingSpot.create()
*/
interface CreateParams {}
type CreateQuery = Record<string, string>;
type CreateBody = {
	name: string;
};

export type CreateReq = RequestI<
	CustomParams<CreateParams>,
	CreateQuery,
	CreateBody
>;
export type CreateHandler = RequestHandler<
	CustomParams<CreateParams>,
	CreateQuery,
	CreateBody,
	qs.ParsedQs
>;
export interface CreateResData {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

/*
 	parkingSpot.updateOne()
*/
interface UpdateOneParams {
	id: number;
}
type UpdateOneQuery = Record<string, string>;
type UpdateOneBody = {
	name: string;
};

export type UpdateOneReq = RequestI<
	CustomParams<UpdateOneParams>,
	UpdateOneQuery,
	UpdateOneBody
>;
export type UpdateOneHandler = RequestHandler<
	CustomParams<UpdateOneParams>,
	UpdateOneQuery,
	UpdateOneBody,
	qs.ParsedQs
>;
export interface UpdateOneResData {
	generatedMaps: Record<string, string>[];
	raw: Record<string, string>[];
	affected?: number;
}

/*
 	parkingSpot.remove()
*/
interface RemoveParams {
	id: number;
}
type RemoveQuery = Record<string, string>;
type RemoveBody = Record<string, string>;

export type RemoveReq = RequestI<
	CustomParams<RemoveParams>,
	RemoveQuery,
	RemoveBody
>;
export type RemoveHandler = RequestHandler<
	CustomParams<RemoveParams>,
	RemoveQuery,
	RemoveBody,
	qs.ParsedQs
>;
export interface RemoveResData {
	raw: Record<string, string>[];
	affected?: number | null;
}
