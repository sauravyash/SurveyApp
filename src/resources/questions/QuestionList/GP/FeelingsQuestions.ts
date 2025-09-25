import { LikertScaleQuestion, SectionIntroScreen } from "../../QuestionTypes";

const commonOptions = {
  0: "Rarely or none of the time (less than 1 day)",
  1: "Some or a little of the time (1-2 days)",
  2: "Occasionally or a moderate amount of time (3-4 days)",
  3: "Most or all of the time (5-7 days)"
};

export const FeelingsQuestions = [
  new SectionIntroScreen(20.1,
      `The next section asks you about your **feelings**. For each of the following statements, please say if you felt that way **during the past week.**`),
  new LikertScaleQuestion(20, "", commonOptions, [
      "I was bothered by things that usually don't bother me.",
      "I had trouble keeping my mind on what I was doing.",
      "I felt depressed.",
      "I felt that everything I did was an effort.",
      "I felt hopeful about the future.",
      "I felt fearful.",
      "My sleep was restless.",
      "I was happy.",
      "I felt lonely.",
      "I could not \"get going\""
  ])
];