import { SectionIntroScreen, LikertScaleQuestion, MultipleChoiceQuestion } from "../../QuestionTypes";

const sleepQuestionOptions = {
  0: "None",
  1: "Mild",
  2: "Moderate",
  3: "Severe",
  4: "Very Severe"
}

export const SleepQuestions = [
  new SectionIntroScreen(13.1,
      `The next group of questions ask about your sleep habits and any problems you may have with sleep.\n
For each question, please select the option that best describes your answer.\n
Please rate the **current (i.e. last 2 weeks)** severity of your insomnia problem(s).`),
  new LikertScaleQuestion(13, "Difficulty falling asleep", sleepQuestionOptions, [
      "Difficulty falling asleep",
      "Difficulty staying asleep",
      "Problems waking up too early"
  ]),
  new MultipleChoiceQuestion(16, "How satisfied/dissatisfied are you with your current sleep pattern?",
      ["Very Satisfied", "Satisfied", "Moderately Satisfied", "Dissatisfied", "Very Dissatisfied"], true),
  new MultipleChoiceQuestion(17, "How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?",
      ["Not at all Noticeable", "A Little", "Somewhat", "Much", "Very Much Noticeable"], true),
  new MultipleChoiceQuestion(18, "How worried/distressed are you about your current sleep problem?",
      ["Not at all Worried", "A Little", "Somewhat", "Much", "Very Much Worried"], true),
  new MultipleChoiceQuestion(19, "To what extent do you consider your sleep problem to interfere with your daily functioning (e.g., daytime fatigue, mood, ability to function at work/daily chores, concentration, memory, mood etc.) currently?",
      ["Not at all Interfering", "A Little", "Somewhat", "Much", "Very Much Interfering"], true),
];