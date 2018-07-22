import { QuestionType } from './QuestionType';
import { QuestionOption } from './QuestionOption';

export class SubQuestion {
    id: number;
    questionAr: string;
    questionEn: string;
    dynamicKey: string;
    questionOrder: number;
    questionType: QuestionType;
    questionOption: QuestionOption[];
}
