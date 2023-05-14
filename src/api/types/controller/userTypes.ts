import { Roles } from "../auth/authorized";
import { CustomParams, RequestI } from "../responses/responsesTypes";
import { RequestHandler } from "express";

/*
 	user.getOne()
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
	role: Roles;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

/*
 	user.login()
*/
interface LoginParams {}
type LoginQuery = Record<string, string>;
type LoginBody = {
	email: string;
};

export type LoginReq = RequestI<
	CustomParams<LoginParams>,
	LoginQuery,
	LoginBody
>;
export type LoginHandler = RequestHandler<
	CustomParams<LoginParams>,
	LoginQuery,
	LoginBody,
	qs.ParsedQs
>;
export interface LoginResData {
	token: string;
}
