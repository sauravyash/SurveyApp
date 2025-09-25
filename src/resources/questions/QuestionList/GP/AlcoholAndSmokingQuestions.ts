import { SectionIntroScreen, MultipleChoiceQuestion } from "../../QuestionTypes";

export const AlcoholAndSmokingQuestions = [
    new SectionIntroScreen(56.1,
        `The next questions are about your alcohol consumption and smoking habits.`),
    new MultipleChoiceQuestion(57, "How many days per week do you have a drink containing alcohol?",
        ["0", "1", "2", "3", "4", "5", "6", "7"], true),
    new MultipleChoiceQuestion(58, "How many standard drinks do you have on a typical day when you are drinking?",
        ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "More than 20"], true, undefined, "link://images/drink-standards.png"),
    new MultipleChoiceQuestion(59, "Do you, or have you ever, smoked cigarettes, cigars, pipes or any other tobacco products?",
        ["Yes, currently", "Yes, not currently", "Never"], true),
];

