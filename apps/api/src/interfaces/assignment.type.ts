import {UserId} from "./user.type";
import {WarehouseItemId} from "./warehouse.type";
import {LeaseRequestId} from "./leasing.type";
import {Timestamp} from "./util.type";

export type AssignmentId = string;

export interface Assignment {
    name: string;
    description: string;
    requestId?: LeaseRequestId;
    assignedTo: UserId;
    leasedItemsIds: [WarehouseItemId];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

