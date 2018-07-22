import { AccountCR } from './AccountCR';
import { SponserCR } from './SponserCR';
import { NextOfKinCR } from './NextOfKinCR';
import { FamilyRelationCode } from './FamilyRelationCode';

import { NextOfKin } from './NextOfKin';
import { Account } from './Account';
import { Decision } from './Decision';
import { SocialResearcherRecommendation } from './SocialResearcherRecommendation';
import { Contact } from './Contact';

export class FamilyMemberCR {
  id: number;
  cpr: string;
  notes: string;
  nextOfKinContact: Contact;
  personArabicName: string;
  personEnglishName: string;
  sponserCR: SponserCR;
  accountCR: AccountCR;
  contact: Contact;
  createdBy: Date;
  createdOn: Date;
  updatedBy: Date;
  updatedOn: Date;

 
}
