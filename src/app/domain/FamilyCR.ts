import { FamilyMemberCR } from './FamilyMemberCR';
import { SponserCR } from './SponserCR';
import { NextOfKinCR } from './NextOfKinCR';

export class FamilyCR {
  id: number;
  notes: string;
  familyMembers: FamilyMemberCR[];

  
  constructor(id?)
  {
    this.id=id;
  }
}
