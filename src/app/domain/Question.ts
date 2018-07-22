import { QuestionType } from './QuestionType';
import { QuestionOption } from './QuestionOption';
import { SubQuestion } from './SubQuestion';

export class Question {
    id: number;

    questionAr: string;

    questionEn: string;

    text?: string;

    questionOrder: number;

    questionType: QuestionType;

    questionOption: QuestionOption[];

    subQuestion: SubQuestion;
}
