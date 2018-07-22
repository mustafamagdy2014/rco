import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Globals } from "../../../../common/globals";

export class DynamicFormValidators{

    static cannotBeEmptyWhenSponserOrContact(control:AbstractControl):ValidationErrors|null{
        if(control.parent){
            let reason =control.parent.get("reason").value;
            if((control.value as string) ===""&&(reason.id==Globals.REASON_CHANGE_SPONSER_ID||reason.id==Globals.REASON_CHANGE_CONTACT_DETAILS_ID)){
                return {cannotBeEmptyWhenSponserOrContact:"true"}
            }
    
        }
   
        return null;
    }

    
    static cannotBeEmptyWhenSponser(control:AbstractControl):ValidationErrors|null{
        if(control.parent){
            let reason =control.parent.get("reason").value;
            if((control.value as string) ===""&&(reason.id==Globals.REASON_CHANGE_SPONSER_ID)){
                return {cannotBeEmptyWhenSponser:"true"}
            }
    
        }
   
        return null;
    }

    static cannotBeEmptyWhenMWD(control:AbstractControl):ValidationErrors|null{
        if(control.parent){
            let reason =control.parent.get("reason").value;
            if((control.value as string) ===""&&(reason.id<6)){
                return {cannotBeEmptyWhenMWD:"true"}
            }
    
        }
   
        return null;
    }
    
    static cannotBeSameSponser(control:AbstractControl):ValidationErrors|null{
        if(control.parent){
            let reason =control.parent.get("reason").value;
            let sponserOldCpr =control.parent.get("sponserOldCpr").value;
            if(Number(control.value) ==sponserOldCpr&&(reason.id==Globals.REASON_CHANGE_SPONSER_ID)){
                return {cannotBeSameSponser:"true"}
            }
    
        }
   
        return null;
    }
}