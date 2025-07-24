import { MultipleChoiceQuestion, SectionIntroScreen, TextQuestion } from "../../QuestionTypes";

export const LeisureActivityQuestions = [
    new SectionIntroScreen(36.1,
        `The next section will ask you questions about activities during leisure time.`),
    new MultipleChoiceQuestion(36, "Thinking of the last year, how often do you read newspapers, including online?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(37, "During the past year, how often did you read magazines, including online?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(38, "During the past year, how often did you read books?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(39, "During the past year, how often did you play games like checkers or other board games, cards, puzzles, word games, mind teasers, or any other similar games? (This includes online games)",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(40, "During the past year, how often did you participate in 'brain training' activities? This includes online and computer activities to improve memory and thinking such as Sudoku, and crosswords.",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(41, "During the past year, how often did you write letters or emails?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(42, "During the past year, how often did you use online social network activities like Facebook/X (previously known as Twitter)?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(43, "During the past year, how often in your paid or unpaid job/work did you participate in intellectually stimulating activities like problem solving, balancing budgets/accounts, any quantitative/numerical activities, computer coding, or formulating correspondence?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(44, "In the past year, how often did you visit a museum?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(45, "In the past year, how often did you attend a concert, play, or musical?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(46, "In the past year, how often did you visit a library?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new TextQuestion(47, "Apart from the previous questions, which other intellectual and cognitively stimulating activities did you participate in?"),
    new MultipleChoiceQuestion(48, "If yes, how often did you participate in the above activities?",
        ["Every day or almost everyday", "Several times a week", "Several times a month",
            "Several times a year", "Once a year or less", "Don't know"
        ], true, [
        {
            question: 47,
            answer: "",
            modifier: "not"
        },
        {
            question: 47,
            answer: "Not Applicable",
            modifier: "not"
        }
    ]),
];

(LeisureActivityQuestions[12] as TextQuestion).setDisplayNoneCheckbox("Not Applicable");