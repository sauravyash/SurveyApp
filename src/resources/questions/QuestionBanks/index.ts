import PublicQuestionSections, { AllQuestions as AllQuestionsPublic } from "./Public";
import GPQuestionSections, { AllQuestions as AllQuestionsGP } from "./GP";
import { LikertScaleQuestion } from "../QuestionTypes";

const SURVEY_TYPE = import.meta.env.VITE_SURVEY_TYPE;
const IS_SURVEY_TYPE_GP = SURVEY_TYPE === "gp";

const AllQuestions = IS_SURVEY_TYPE_GP ?  AllQuestionsGP : AllQuestionsPublic;
const questionSections  = IS_SURVEY_TYPE_GP ? GPQuestionSections : PublicQuestionSections;


export type QuestionList = {
  [key: string]: string;
}

export const questionList: QuestionList = AllQuestions.reduce((obj, question) => {
    if (question.getType() === "likert-scale") {
      (question as LikertScaleQuestion).getQuestionList().forEach((q, i) => {
        obj[(question.getQuestionNumber() + i)] = q;
      });
      return obj;
    }
    obj[question.getQuestionNumber()] = question.getQuestion();
    return obj;
  }, {} as QuestionList);

export {
  AllQuestions,
  SURVEY_TYPE,
  IS_SURVEY_TYPE_GP
}

export default questionSections;