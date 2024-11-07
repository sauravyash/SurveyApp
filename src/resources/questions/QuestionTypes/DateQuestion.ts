import { BaseQuestionObject } from "./BaseQuestionType";

export class DateQuestion extends BaseQuestionObject {
  constructor(id: number, question: string) {
      super(id, question, 'date');
  }
}