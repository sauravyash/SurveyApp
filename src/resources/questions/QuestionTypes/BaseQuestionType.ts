export class BaseQuestionObject {
  private question_number: number;
  private question_text: string;
  private type: string;
  private optional: boolean = false;
  private scoring: boolean = false;
  private conditions: { question: number, answer: any, modifier?: string }[];
  private context?: string;

  constructor(id: number, question: string, type: string, scoring: boolean = false, optional: boolean = false,
      conditions: { question: number, answer: string, modifier?: string }[] = [],
      context: (string | undefined) = undefined
  ) {
      this.question_number = id;
      this.question_text = question;
      this.type = type;
      this.scoring = scoring;
      this.optional = optional;
      this.conditions = conditions;
      this.context = context;
  }

  public getAttributes() {
      return {
          question_number: this.question_number,
          question: this.question_text,
          type: this.type,
          optional: this.optional,
          scoring: this.scoring,
          context: this.context
      }
  }

  public getQuestion() {
      return this.question_text;
  }

  public getQuestionNumber() {
      return this.question_number
  }

  public getType() {
      return this.type;
  }
  public getConditions() {
      return this.conditions;
  }

  protected setContext(context: string) {
    this.context = context;
  }
}