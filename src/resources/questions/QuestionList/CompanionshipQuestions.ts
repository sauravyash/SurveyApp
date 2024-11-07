import { SectionIntroScreen, MultipleChoiceQuestion, LikertScaleQuestion } from "../QuestionTypes";

const companionshipOptions = {
  0: "Hardly ever",
  1: "Some of the time",
  2: "Often"
};

export const CompanionshipQuestions = [
  new SectionIntroScreen(76.1,
      `The following questions will ask you about companionship and your feelings. `),
  new MultipleChoiceQuestion(76, "Do you live alone or with other people?",
      ["Live alone or with spouse only", "Live with extended family (children and grandchildren)"], true),
  new LikertScaleQuestion(77, "Companionship", companionshipOptions, [
      "How often do you feel that you lack companionship?",
      "How often do you feel left out?",
      "How often do you feel isolated from others?",
  ]),
];