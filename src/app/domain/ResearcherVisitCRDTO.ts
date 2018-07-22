export class ResearcherVisitCRDTO {
    familyId:number;
    nextOfKinCPR:number;
    visitDate:string; 
    visitStartTime:string;
    visitEndTime:string;
    visitId:number;

    constructor(familyId: number, nextOfKinCPR: number, visitDate: string, visitStartTime: string, visitEndTime: string, visitId:number)
    {
        this.familyId=familyId;
        this.nextOfKinCPR=nextOfKinCPR;
        this.visitDate=visitDate;
        this.visitEndTime=visitEndTime;
        this.visitStartTime=visitStartTime;    
        this.visitId=visitId;
    }
}