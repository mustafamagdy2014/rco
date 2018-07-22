import { SponsershipRequest } from './SponsershipRequest';
import { CommitteeMember } from './CommitteeMember';
import { CommitteeMeetingStatus } from './CommitteeMeetingStatus';
import { CommitteeDecision } from './CommitteeDecision';

export class CommitteeMeeting {
    id: number;
    meetingDate: Date;
    note: string;
    committeeMember: CommitteeMember[];
    sponsershipRequests: SponsershipRequest[];
    committeeMeetingStatus: CommitteeMeetingStatus;
    CommitteeDecisions:CommitteeDecision[];
}
