import { BeneficiaryStatus } from './BeneficiaryStatus';
export class BeneficiaryPaymentDetails {
	createdBy?: string;
	createdOn?: Date;
	updatedBy?: string;
	updatedOn?: Date;
	cpr: number;
	startDate: Date;
	finishDate?: Date;
	amount: number;
	active: boolean;
	decisionId: number;
	status:BeneficiaryStatus;

	id:number;
	personArabicName:string;
	personEnglishName:string;
	familyId:number;
	requestCreationDate:Date;
	bankName:string;
	accountNo:String;
	monthsCount:number;
	actualAmount:number;
	maritalStatusArabicName:string;
	serial:number;
}