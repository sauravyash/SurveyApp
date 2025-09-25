import { BaseQuestionObject } from "./BaseQuestionType";
import { ContextOptions } from "./ContextOptions";

export class MultipleChoiceQuestion extends BaseQuestionObject {
    private options: string[];
    private contextLocation: "above" | "below" = "above";
    private contextTextColour: string = "#000";
    private contextTextSize: string = "1.5em";


    constructor(
        id: number,
        question: string,
        options: string[],
        scoring: boolean = false,
        conditions: {
            question: number,
            answer: string,
            modifier?: string
        }[] = [],
        context: (string | undefined) = undefined
    ) {
        super(id, question, 'multiple-choice', scoring, true, conditions, context);
        this.options = options;
    }

    public getAttributes() {
        return {
            ...super.getAttributes(),
            contextOptions: this.getContextOptions() 
        };
    }

    public getOptions() {
        return this.options;
    }

    public setContextOptions(options: ContextOptions) {
        if (options.location) {
            this.contextLocation = options.location;
        }

        if (options.textColour) {
            this.contextTextColour = options.textColour;
        }

        if (options.textSize) {
            this.contextTextSize = options.textSize;
        }

        if (options.text) {
            super.setContext(options.text);
        }
    }

    public getContextOptions() : ContextOptions {
        return {
            location: this.contextLocation,
            textColour: this.contextTextColour,
            textSize: this.contextTextSize
        }
    }
}