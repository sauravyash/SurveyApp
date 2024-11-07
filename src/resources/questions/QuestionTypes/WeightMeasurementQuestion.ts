import { BaseQuestionObject } from "./BaseQuestionType";

export class WaistMeasurementQuestion extends BaseQuestionObject {
  private options: {
      conditions: "default" | {
          question: number,
          answer: string,
          modifier?: string
      }[];
      male: string[];
      female: string[];
  }[];

  constructor(
      id: number,
      question: string,
      options: {
          conditions: "default" | {
              question: number,
              answer: string,
              modifier?: string
          }[];
          male: string[];
          female: string[];
      }[],
      scoring: boolean = true
  ) {
      super(id, question, 'waist-measurement', scoring);
      this.options = options;
  }

  public getAttributes() {
      let attributes = {
          ...super.getAttributes(),
          options: this.options
      };
      return attributes;
  }

  public getOptions() {
      return this.options;
  }
}