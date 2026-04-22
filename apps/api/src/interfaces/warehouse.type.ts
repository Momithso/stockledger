import {AssignmentId} from "./assignment.type";
import {Timestamp} from "./util.type";

export type WarehouseItemId = string;
export type WarehouseRoomId = string;

export interface WarehouseItem {
    name: string;
    image: [string];
    description: string;
    stateHistory: [ItemState];
    assignmentHistory: [AssignmentId];
    located: WarehouseItemId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface ItemState {
    note: string;
    state: "available" | "reserved" | "damaged" | "lost" | "leased";
    createdAt: Timestamp;
    until?: Timestamp;
    returned?: Timestamp;
}

export interface WarehouseRoom {
    name: string;
    description?: string;
    location: Location;
    shelves: [Shelf] | [];
}

export interface Shelf {
    nr: number;
    name: string;
    description: string;
}

export interface Location {
    name: string;
    roomNr?: string;
    street: string;
    houseNr: number;
    city: string;
    zipcode: number;
    latitude?: number;
    longitude?: number;
}
