import { SectionIntroScreen, LikertScaleQuestion } from "../../QuestionTypes";

const companionshipOptions = {
  0: "Hardly ever",
  1: "Some of the time",
  2: "Often"
};

export const CompanionshipQuestions = [
  new SectionIntroScreen(49.1,
      `The following questions will ask you about companionship and your feelings. `),
  new LikertScaleQuestion(49, "Companionship", companionshipOptions, [
      "How often do you feel that you lack companionship?",
      "How often do you feel left out?",
      "How often do you feel isolated from others?",
  ]),
];