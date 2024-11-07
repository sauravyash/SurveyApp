import { BaseQuestionObject } from "./BaseQuestionType";

export class TextQuestion extends BaseQuestionObject {
  private showNoneCheckbox: boolean | string = false;
  constructor(id: number, question: string, scoring: boolean = false) {
      super(id, question, 'text', scoring);
  }


  public setDisplayNoneCheckbox(value: boolean | string) {
      this.showNoneCheckbox = value;
  }

  public getDisplayNoneCheckbox() {
      return this.showNoneCheckbox;
  }
}