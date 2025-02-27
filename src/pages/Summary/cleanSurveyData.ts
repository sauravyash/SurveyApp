import { questionList } from "../../resources/questions/QuestionBanks";
import { parseAnswerData } from "./parseAnswerData";

export const cleanSurveyData = (data: any) => {
  return Object.entries(data).map(arr => ({
    question_number: Number(arr[0]),
    question: questionList[arr[0]],
    answer: parseAnswerData(arr),
  }));
}