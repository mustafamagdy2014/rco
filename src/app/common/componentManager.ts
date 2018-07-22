
export class ComponentManager {

    public static readonly VIEW_WIDOW: string = 'view-widow-info';
    public static readonly VIEW_ORPHAN: string = 'view-orphan-info';
    public static readonly VIEW_FAMILY_MEMBERS: string = 'view-family-members-info';
    public static readonly APPLY_NEW_REQUEST: string = 'applyforMonthlySponsership';
    public static readonly UPDATE_SPONSERSHIP_REQUEST: string = 'updateMonthlySponsershipRequest';
    public static readonly UPDATE_SPONSERSHIP_CHANGE_REQUEST: string = 'updateMonthlySponsershipChangeRequest';

    private roles: string[] = [];

    public applicantVisible: boolean;
    public applicantEditable: boolean;

    public attachmentVisible: boolean;

    public commentVisible: boolean;
    public commentEditable: boolean;

    public incomeVisible: boolean;
    public expenseVisible: boolean;

    public paymentDetailsVisible = false;

    public familymembersVisible: boolean;
    public assigneesVisible: boolean;
    public committeeDecisionVisible:boolean;

    public committeeDiscussVisible: boolean;

    public visitScheduleVisible:boolean;
    public nextOfKinVisible:boolean;
    public sponsorVisible:boolean;
    public familyVisible:boolean;

    relationCodeViewNameMap: Map<string, string>;


    constructor(viewName: string, relationCode?: number, roles?: string[]) {

        this.relationCodeViewNameMap = new Map();
        this.relationCodeViewNameMap.set('4', 'view-orphan-info');
        this.relationCodeViewNameMap.set('3', 'view-orphan-info');
        this.relationCodeViewNameMap.set('5', 'view-widow-info');

        if (roles) {
            this.roles = roles;
        }

        if (relationCode) {
            viewName = this.relationCodeViewNameMap.get(relationCode.toString());
        }

        this.init(viewName);
    }

    public init(viewName: string): void {
        this.resolveFamily(viewName);
        this.resolveApplicant(viewName);
        this.resolveComment(viewName);
        this.resolvePaymentDetails(viewName);
        this.resolveFamilyMember(viewName);
        this.resolveAttachment(viewName);
        this.resolveAssignees(viewName);
        this.resolveCommitteeDecision(viewName);
        this.resolveCommitteeDiscuss(viewName);
        this.resolveVisitSchedule(viewName);
        this.resolveIncome(viewName);
        this.resolveExpense(viewName);
        this.resolveNextOfKin(viewName);
        this.resolveSponsor(viewName);
    }

    private resolveApplicant(viewName: string): void {

        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.applicantVisible = false;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.applicantVisible = false;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.applicantVisible = true;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.applicantVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.applicantVisible = true;
            }

        }
    }
    private resolveIncome(viewName: string): void {

        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.incomeVisible = true;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.incomeVisible = true;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.incomeVisible = false;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.incomeVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.incomeVisible = true;
            }

        }
    }
    private resolveExpense(viewName: string): void {

        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.expenseVisible = true;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.expenseVisible = true;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.expenseVisible = false;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.expenseVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.expenseVisible = true;
            }

        }
    }
    private resolveFamily(viewName: string): void {

        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.familyVisible = false;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.familyVisible = false;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.familyVisible = true;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.familyVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.familyVisible = true;
            }

        }
    }

    private resolveAttachment(viewName: string): void {

        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.attachmentVisible = false;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.attachmentVisible = false;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.attachmentVisible = true;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.attachmentVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.attachmentVisible = true;
            }


        }
    }


    private resolveComment(viewName: string) {
        if (viewName) {

            if (viewName === ComponentManager.VIEW_WIDOW) {
                this.commentVisible = false;
            } else if (viewName === ComponentManager.VIEW_ORPHAN) {
                this.commentVisible = false;
            } else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.commentVisible = true;
            } else if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.commentVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.commentVisible = true;
            }

        }
    }

    private resolvePaymentDetails(viewName: string): void {
        if (viewName) {
            if (viewName === ComponentManager.VIEW_WIDOW || viewName === ComponentManager.VIEW_ORPHAN) {
                this.paymentDetailsVisible = true;
            }
        }
    }
    private resolveNextOfKin(viewName: string): void {
        if (viewName) {
            
            if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.nextOfKinVisible = false;
            }else{
                this.nextOfKinVisible=true;
            }
        }
    }
    private resolveSponsor(viewName: string): void {
        if (viewName) {
            
            if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.sponsorVisible = false;
            }else{
                this.sponsorVisible=true;
            }
        }
    }

    private resolveFamilyMember(viewName: string): void {
        if (viewName) {
            if (viewName === ComponentManager.APPLY_NEW_REQUEST) {
                this.familymembersVisible = true;
            } else if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.familymembersVisible = true;
            }else if (viewName === ComponentManager.VIEW_FAMILY_MEMBERS) {
                this.familymembersVisible = true;
            }
        }
    }

    private resolveAssignees(viewName: string) {
        if (viewName) {
            if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST) {
                this.assigneesVisible = true;
            }
            if (viewName === ComponentManager.UPDATE_SPONSERSHIP_CHANGE_REQUEST) {
                this.assigneesVisible = true;
            }
            if (this.roles.includes('ROLE_COMMITTEE_SECRETARY')) {
                this.assigneesVisible = false;
            }

        }
    }

    private resolveCommitteeDecision(viewName: string) {
        if (viewName) {
            if (this.roles.includes('ROLE_COMMITTEE_SECRETARY')) {
                this.committeeDecisionVisible = true;
            }

        }
    }

    private resolveCommitteeDiscuss(viewName: string) {
        if (viewName) {
            if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST&&this.roles.includes('ROLE_COMMITTEE_SECRETARY')) {
                this.committeeDiscussVisible = true;
            }

        }
    }

    private resolveVisitSchedule(viewName: string) {
        if (viewName) {
            if (viewName === ComponentManager.UPDATE_SPONSERSHIP_REQUEST || viewName === ComponentManager.UPDATE_SPONSERSHIP_CHANGE_REQUEST)
            {
                if (this.roles.includes('ROLE_SENIOR_SOCIAL_RESEARCHER')||this.roles.includes('ROLE_SOCIAL_RESEARCHER')) {
                    this.visitScheduleVisible = true;
                }
            }
        }
    }
}
