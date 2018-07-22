import { Status } from './Status';
import { SponsershipComments } from './SponsershipComments';
import { Attachment } from './Attachment';
import { Family } from './Family';
import { AssigneeDetails } from './AssigneeDetails';
import { Stage } from './Stage';
import { ServiceType } from './ServiceType';
import { RequestType } from './RequestType';
export class SponsershipRequest {
    id: number;
    family: Family;
    status: Status;
    notes: string;
    stage: Stage;
    applicantCpr: number;
    createdOn: Date;
    createdBy: string;
    rejectionReasons: string[];
    sponsershipComments: SponsershipComments[];
    attachments: Attachment[] = [];
    assigneeDetails: AssigneeDetails;
    taskId: string;
    taskOwner: string;
    requestType: RequestType;
    serviceType: ServiceType;

    constructor(family: Family, id?, status?, stage?, createdOn?) {
        this.id = id;
        this.family = family;
        this.status = status;
        this.stage = stage;
        this.createdOn = createdOn;
    }


}
