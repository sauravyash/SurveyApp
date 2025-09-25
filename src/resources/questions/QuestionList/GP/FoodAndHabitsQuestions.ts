import { SectionIntroScreen, MultipleChoiceQuestion } from "../../QuestionTypes";

export const FoodAndHabitsQuestions = [
    new SectionIntroScreen(52.1,
        `In this section, we will ask you questions regarding your diet and habits.`),
    new MultipleChoiceQuestion(52, "How often do you eat a serving of fish or seafood that is not deep-fried?",
        ["Rarely", "1-3 times per month", "Once a week", "2-3 times per week", "4 or more times per week"], true, undefined, "For example, a 100g fish fillet or one small can of fish is one serve."),
    new MultipleChoiceQuestion(53, "How often do you eat vegetables?", ["Every day", "Not every day"], true),
    new MultipleChoiceQuestion(54, "How many serves of vegetables do you usually eat each day?",
        ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat vegetables"], true, [
        { question: 53, answer: "Every day" }
    ], "A standard serve is approximately half a cup of cooked vegetables, or 1 cup green leafy vegetables or raw salad."),
    new MultipleChoiceQuestion(55, "How often do you eat fruits?", ["Every day", "Not every day"], true),
    new MultipleChoiceQuestion(56, "How many serves of fruits do you usually eat each day?",
        ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat fruits"], true, [
        { question: 55, answer: "Every day" }
    ], "A standard serve is approximately 1 medium piece of fruit or 2 small pieces of fruit or 1 cup of diced fruit or ½ cup of fruit juice")
];

