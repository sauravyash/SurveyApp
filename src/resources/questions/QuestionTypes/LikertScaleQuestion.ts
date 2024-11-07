import { BaseQuestionObject } from "./BaseQuestionType";

export class LikertScaleQuestion extends BaseQuestionObject {
  private options: {
      [key: number]: string
  } = {};
  private questions: string[];

  constructor(
      id: number,
      question: string,
      options: { [key: number]: string },
      questions: string[] = [],
      scoring: boolean = true,
      optional: boolean = false
  ) {
      super(id, question, 'likert-scale', scoring, optional);
      this.options = options;
      this.questions = questions;
  }

  public getOptions() {
      return this.options;
  }

  public getQuestionList() {
      return this.questions;
  }
}