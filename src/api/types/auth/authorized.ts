import { RequestI } from "../responses/responsesTypes";

export enum Roles {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    USER = "USER",
}

export interface Opts {
	hasRole: Array<Roles>;
	ownership?: (req: RequestI) => Promise<boolean>;
}
