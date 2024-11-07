import { BaseQuestionObject } from "./BaseQuestionType";

export class MultipleChoiceQuestion extends BaseQuestionObject {
    private options: string[];


    constructor(id: number, question: string, options: string[], scoring: boolean = false,
        conditions: { question: number, answer: string, modifier?: string }[] = [], context: (string | undefined) = undefined) {
        super(id, question, 'multiple-choice', scoring, true, conditions, context);
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