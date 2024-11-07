import { SectionIntroScreen, MultipleChoiceQuestion } from "../QuestionTypes";

export const EnvironmentalExposuresQuestions = [
    new SectionIntroScreen(109.1,
        `This last question is on your exposure to pesticides`),
    new MultipleChoiceQuestion(109, "Have you ever been involved with mixing, applying or loading any pesticide, herbicide, weed killers, fumigants or fungicides?",
        ["Yes", "No", "Don't know"], true),
];