import { BeneficiaryStatus } from './BeneficiaryStatus';
import { FamilyRelationCode } from './FamilyRelationCode';

import { Sponser } from './Sponser';
import { SponsorshipFinance } from './SponsorshipFinance';
import { NextOfKin } from './NextOfKin';
import { Account } from './Account';
import { Decision } from './Decision';
import { SocialResearcherRecommendation } from './SocialResearcherRecommendation';
import { Contact } from './Contact';
import { CommitteeDecision } from './CommitteeDecision';

export class FamilyMember {
  id: number;
  cpr: string;
  notes: string;
  valid: boolean;
  personArabicName: string;
  personEnglishName: string;
  birthDate: Date;
  genderString: string;
  age: number;
  gender: number;
  isBahraini: boolean;
  isAlive: boolean;
  maritalStatusCode: string;
  maritalStatusCodeName:string="";
  laborParticipationTypeCode: string;
  rejectionReasons: string[];
  decision: Decision;
  sponser: Sponser;
  nextOfKin: NextOfKin;
  account: Account;
  student: boolean;
  work: boolean;
  familyRelationCode: FamilyRelationCode;
  requestResults: any[];
  contact: Contact;
  createdBy: Date;
  createdOn: Date;
  updatedBy: Date;
  updatedOn: Date;
  recommendation: SocialResearcherRecommendation;
  committeeDecision:CommitteeDecision;
  beneficiaryStatus:BeneficiaryStatus;

 
}
