import { MultipleChoiceQuestion, SectionIntroScreen } from "../../QuestionTypes";
import { NumberQuestionV2 } from "../../QuestionTypes/NumberQuestion";

export const PersonalInformationQuestions = [
    new SectionIntroScreen(1.1,
        `In this section, we will ask you for some general information about yourself.`),
    new NumberQuestionV2(1, "What is your age?", ["year"], false, {
        "year": {
            min: 18,
            max: 130,
            step: 1
        }
    }),
    new MultipleChoiceQuestion(2, "What is your gender?", ["Male", "Female", "Non-Binary", "Other identity", "Prefer not to say"], true),
    new MultipleChoiceQuestion(3, "What was the highest qualification that you completed?",
        [
            "Partially completed primary/elementary school (or equivalent)",
            "Completed primary/elementary school (or equivalent)",
            "School certificate (Year 10) (or equivalent)",
            "Higher school certificate (Year 12) (or equivalent)",
            "Trade certificate/apprenticeship",
            "Technician’s certificate/advanced certificate",
            "Certificate other than above",
            "Associate diploma",
            "Undergraduate diploma",
            "Bachelor’s degree",
            "Post graduate diploma/certificate",
            "Higher degree"

        ], true),
    new NumberQuestionV2(4, "Enter your height in either cm or feet/inches",
        ["cm", "feet / inches"],
        true,
        {
            "cm": { min: 100, max: 300, step: 1 },
            "feet": { min: 3, max: 8, step: 1 },
            "inches": { min: 0, max: 11, step: 1 }
        },
    ),
    new NumberQuestionV2(
        5,
        "Enter your weight in kgs or stones/pounds",
        ["kg", "stone / pounds", "lb"],
        true,
        {
            "kg": { min: 40, max: 300, step: 1 },
            "stone / pounds": { min: 0, max: 50, step: 1 },
            "stone": { min: 2, max: 50, step: 1 },
            "pounds": { min: 0, max: 13, step: 1 },
            "lb": { min: 60, max: 700, step: 1 }
        },
    ),
];

(PersonalInformationQuestions.find(q => q.getQuestionNumber() === 1) as NumberQuestionV2).setContextOptions({
    textColour: "red",
    location: "below",
    text: "You must be 18 or older to participate in this assessment."
});