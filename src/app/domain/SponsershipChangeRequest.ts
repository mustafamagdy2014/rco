import { FamilyCR } from './FamilyCR';
import { ChangeRequestApplicant } from './ChangeRequestApplicant';
import { Status } from './Status';
import { SponsershipComments } from './SponsershipComments';
import { Attachment } from './Attachment';
import { Family } from './Family';
import { AssigneeDetails } from './AssigneeDetails';
import { Stage } from './Stage';
import { ServiceType } from './ServiceType';
import { RequestType } from './RequestType';
import { Topic } from './Topic';
import { TopicReason } from './TopicReason';
import { CommitteeDecision } from './CommitteeDecision';
export class SponsershipChangeRequest 
{
    id: number;
    family: Family;
    status: Status;
    notes: string;
    stage: Stage;
    applicant: ChangeRequestApplicant;
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
    topic:Topic;
    reason:TopicReason;
    topicReasonDate:Date;
    familyChangeRequest:FamilyCR;
    contactOwner:number;
    committeeDecision:CommitteeDecision;
    
    constructor(family: Family, familyChangeRequest:FamilyCR, id?, status?, stage?, createdOn?) 
    {
        this.id = id;
        this.family = family;
        this.status = status;
        this.stage = stage;
        this.createdOn = createdOn;
        this.familyChangeRequest = familyChangeRequest;
    }
}
