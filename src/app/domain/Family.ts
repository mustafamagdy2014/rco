import { Expense } from './Expense';
import { FamilyMember } from "./FamilyMember";
import { Sponser } from "./Sponser";
import { Income } from "./Income";
import { NextOfKin } from "./NextOfKin";

export class Family {
  id: number;
  deathReason: string;
  notes: string;
  familyMembers: FamilyMember[];
  nextOfKins:NextOfKin[];
  sponsers:Sponser[];
  incomes:Income[];
  expenses:Expense[];
  martyr:boolean;
  fatherMotherInRelation:boolean;
  
  constructor(id?)
  {
    this.id=id;
  }
}
