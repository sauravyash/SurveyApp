import { BaseQuestionObject } from "./BaseQuestionType";

export class SectionIntroScreen extends BaseQuestionObject {
  constructor(id: number, content: string) {
      super(id, content, 'section-intro', false);
  }

  public getContent() {
      return this.getQuestion();
  }

}