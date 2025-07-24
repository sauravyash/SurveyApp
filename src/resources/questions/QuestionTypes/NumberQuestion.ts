import { BaseQuestionObject } from "./BaseQuestionType";

export class NumberQuestion extends BaseQuestionObject {
    private minValue: number;
    private maxValue: number;
    private defaultValue: any;
    private units: string[];
    private scientific_unit: boolean;
    private step: number = 1;
    private showNoneCheckbox: boolean | string = false;
    private contextLocation: string = "above";

    constructor(
        id: number,
        question: string,
        units: string[] = [],
        scientific_unit: boolean = false,
        minValue: number = 0,
        maxValue: number = 1000,
        defaultValue: any = 0,
        scoring: boolean = true,
        conditions: { question: number, answer: any, modifier?: string }[] = [],
        optional: boolean = false,
        step: number = 1,
        context: (string | undefined) = undefined
    ) {
        super(id, question, 'number', scoring, optional, conditions, context);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.defaultValue = defaultValue;
        this.units = units;
        this.scientific_unit = scientific_unit;
        this.step = step;
    }

    public getMinValue() {
        return this.minValue;
    }

    public getMaxValue() {
        return this.maxValue;
    }

    public getDefaultValue() {
        return this.defaultValue;
    }

    public getAttributes() {
        return {
            ...super.getAttributes(),
            options: this.units,
            scientific_unit: this.scientific_unit,
            step: this.step,
            contextLocation: this.contextLocation
        };
    }

    public getUnits() {
        return this.units;
    }

    public setDisplayNoneCheckbox(value: boolean | string) {
        this.showNoneCheckbox = value;
    }

    public setContextLocation(location: string) {
        this.contextLocation = location
    }

    public getDisplayNoneCheckbox() {
        return this.showNoneCheckbox;
    }
}

type Bounds = {
    [key: string]: {
        min: number,
        max: number,
        step: number,
        defaultValue?: number
    }
}

export type ContextOptions = {
    location?: "above" | "below",
    textColour?: string,
    text?: string
}

export class NumberQuestionV2 extends BaseQuestionObject {
    private bounds: Bounds;
    private units: string[];
    private scientific_unit: boolean;
    private showNoneCheckbox: boolean | string = false;
    private contextLocation: "above" | "below" = "above";
    private contextTextColour: string = "#000";

    constructor(
        id: number,
        question: string,
        units: string[] = [],
        scientific_unit: boolean = false,
        bounds?: Bounds,
        scoring: boolean = true,
        conditions: { question: number, answer: any, modifier?: string }[] = [],
        optional: boolean = false,
        context?: string
    ) {
        super(id, question, 'number2', scoring, optional, conditions, context);
        this.bounds = bounds || {};
        if (!this.bounds.default) {
            this.bounds.default = {
                min: 0,
                max: 1000,
                step: 1,
                defaultValue: 0
            }
        }
        this.units = units;
        this.scientific_unit = scientific_unit;
    }

    public getMinValue(unit: string = "default") {
        if (!unit || !this.bounds[unit]) {
            unit = "default";
        }
        return this.bounds[unit].min;
    }

    public getMaxValue(unit: string = "default") {
        if (!unit || !this.bounds[unit]) {
            unit = "default";
        }
        return this.bounds[unit].max;
    }

    public getDefaultValue(unit: string = "default") {
        if (!unit || !this.bounds[unit]) {
            unit = "default";
        }
        return this.bounds[unit].defaultValue;
    }

    public getStepValue(unit: string = "default") {
        if (!unit || !this.bounds[unit]) {
            unit = "default";
        }

        return this.bounds[unit].step;
    }

    public getAttributes() {
        return {
            ...super.getAttributes(),
            options: this.units,
            scientific_unit: this.scientific_unit,
            contextLocation: this.contextLocation,
            contextTextColour: this.contextTextColour
        };
    }

    public getContextOptions() : ContextOptions {
        return {
            location: this.contextLocation,
            textColour: this.contextTextColour
        }
    }

    public getUnits() {
        return this.units;
    }
    

    public setDisplayNoneCheckbox(value: boolean | string) {
        this.showNoneCheckbox = value;
    }

    public setContextLocation(location: "above" | "below") {
        this.contextLocation = location
    }

    public setContextOptions(options: ContextOptions) {
        if (options.location) {
            this.contextLocation = options.location;
        }

        if (options.textColour) {
            this.contextTextColour = options.textColour;
        }

        if (options.text) {
            super.setContext(options.text); 
        }
    }

    public getDisplayNoneCheckbox() {
        return this.showNoneCheckbox;
    }
}