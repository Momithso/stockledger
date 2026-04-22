import {Timestamp} from "./util.type";

export type LeaseRequestId = string;

export interface LeaseRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
    createdAt: Timestamp;
}