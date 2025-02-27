import { MultipleChoiceQuestion, SectionIntroScreen, TextQuestion } from "../../QuestionTypes";

export const LeisureActivityQuestions = [
  new SectionIntroScreen(62.1,
      `The next section will ask you questions about activities during leisure time.`),
  new MultipleChoiceQuestion(62, "About how much time do you spend reading each day, including online reading?",
      ["None", "Less than one hour", "One to less than 2 hours", "Two to less than 3 hours", "Three or more hours", "Don't know"], true),
  new MultipleChoiceQuestion(63, "Thinking of the last year, how often do you read newspapers, including online?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(64, "During the past year, how often did you read magazines, including online?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(65, "During the past year, how often did you read books?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(66, "During the past year, how often did you play games like checkers or other board games, cards, puzzles, word games, mind teasers, or any other similar games? (This includes online games)",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(67, "During the past year, how often did you participate in 'brain training' activities? This includes online and computer activities to improve memory and thinking such as Sudoku, and crosswords.",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(68, "During the past year, how often did you write letters or emails?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(69, "During the past year, how often did you use online social network activities like Facebook/X (previously known as Twitter)?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(70, "During the past year, how often in your paid or unpaid job/work did you participate in intellectually stimulating activities like problem solving, balancing budgets/accounts, any quantitative/numerical activities, computer coding, or formulating correspondence?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new TextQuestion(71, "Apart from the previous questions, which other intellectual and cognitively stimulating activities did you participate in?"),
  new MultipleChoiceQuestion(72, "If yes, how often did you participate in the above activities?",
      ["Every day or almost everyday", "Several times a week", "Several times a month",
          "Several times a year", "Once a year or less", "Don't know"
      ], true, [
      {
          question: 71,
          answer: "",
          modifier: "not"
      },
      {
          question: 71,
          answer: "Not Applicable",
          modifier: "not"
      }
  ]),
  new MultipleChoiceQuestion(73, "In the past year, how many times did you visit a museum?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(74, "In the past year, how many times did you attend a concert, play, or musical?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
  new MultipleChoiceQuestion(75, "In the past year, how often did you visit a library?",
      ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
];

(LeisureActivityQuestions[10] as TextQuestion).setDisplayNoneCheckbox("Not Applicable");