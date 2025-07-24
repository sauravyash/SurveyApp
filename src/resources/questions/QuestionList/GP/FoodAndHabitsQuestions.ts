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
    ], "A standard serve is approximately 1 medium apple, pear, banana, or orange, or 1 cup diced or canned fruit, or 2 small pieces of fruit such as 2 kiwis or 2 peaches."),
    new MultipleChoiceQuestion(55, "How often do you eat fruits?", ["Every day", "Not every day"], true),
    new MultipleChoiceQuestion(56, "How many serves of fruits do you usually eat each day?",
        ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat fruits"], true, [
        { question: 55, answer: "Every day" }
    ], "A standard serve is approximately 1 medium piece of fruit or 2 small pieces of fruit or 1 cup of diced fruit or ½ cup of fruit juice"),
    new SectionIntroScreen(57.1,
        `The next questions are about your alcohol consumption and smoking habits.`),
    new MultipleChoiceQuestion(57, "How many days per week do you have a drink containing alcohol?",
        ["0", "1", "2", "3", "4", "5", "6", "7"], true),
    new MultipleChoiceQuestion(58, "How many standard drinks do you have on a typical day when you are drinking?",
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "More than 20"], true, undefined, "link://images/drink-standards.png"),
    new MultipleChoiceQuestion(59, "Do you, or have you ever, smoked cigarettes, cigars, pipes or any other tobacco products?",
        ["Yes, currently", "Yes, not currently", "Never"], true),
];

