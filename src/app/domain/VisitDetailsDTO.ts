import { VisitDetails } from './VisitDetails';
export class VisitDetailsDTO
{
    visitId:number;
    visitDetailsList: VisitDetails[];
    visitDate:string;
    visitStartTime:string;
    visitEndTime:string;

    constructor(visitId:number, visitDetailsList: VisitDetails[], visitDate: string, visitStartTime: string, visitEndTime: string) 
    {
        this.visitId = visitId;
        this.visitDetailsList = visitDetailsList;
        this.visitDate = visitDate;
        this.visitStartTime = visitStartTime;
        this.visitEndTime = visitEndTime;
	}
}