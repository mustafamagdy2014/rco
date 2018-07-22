import { ResearcherVisitAttachment } from './ResearcherVisitAttachment';
import { VisitStatus } from './VisitStatus';
import { NextOfKin } from './NextOfKin';
export class ResearcherVisit {
    createdBy?: any;
    createdOn?: any;
    updatedBy?: any;
    updatedOn?: any;
    id: number;
    startDate?: Date;
    endDate?: Date;
    visitStatus: VisitStatus;
    notes?: string;
    nextOfKin: NextOfKin;
    researcherName: string;
    attachments: ResearcherVisitAttachment[];
    nextOfKinsList: NextOfKin[];
    familyId: number;
    building:string;
    flat:string;
    road:string;
    buildingAlpha:string;
    block:string;
    newVisitStatus: VisitStatus;
}