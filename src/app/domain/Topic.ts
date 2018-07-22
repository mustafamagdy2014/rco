import { Lookup } from "./lookup";
import { TopicReason } from "./TopicReason";
import { Decision } from "./Decision";

export class Topic extends Lookup{
    reasons:TopicReason[];
    decisions:Decision[];
    
}