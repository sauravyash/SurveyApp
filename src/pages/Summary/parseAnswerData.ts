import { AllQuestions } from "../../resources/questions/QuestionBanks";
import { NumberQuestion } from "../../resources/questions/QuestionTypes";

export const parseAnswerData: (arr: [string, any]) => string = (arr) => { 
  if (!arr[1] || arr[1] === "") {
    return "No answer provided";
  }

  if (arr[1] === "unsure") return "Unsure";

  if (typeof arr[1] === "string") {
    let val = arr[1];
    if (val.includes(": ")) {
      val = val.split(": ")[1];
    }
    if (val.startsWith("Other::")) {
      val = val.split("::")[1];
    }
    if (val.includes(`q${arr[0]}:`)) {
      val = val.split(`q${arr[0]}:`)[1];
    }
    return val;
  }

  if (typeof arr[1] === "object") {
    if (arr[1].currentKey) {
      let val = arr[1].currentKey;
      if (val && val.includes(arr[0] + ": ")) {
        val = val.split(arr[0] + ": ")[1];
      }
      return val;
    }
    const a = Object.entries(arr[1]);
    if (a.length === 0) {
      return "No answer provided";
    }
    const [unit, amount] = a[0];
    const questionData = AllQuestions.find(q => q.getQuestionNumber() === Number(arr[0]));

    if (questionData && questionData.getType() === "number") {
      return `${amount} ${unit}${amount !== 1 && !(questionData as NumberQuestion).getAttributes().scientific_unit ? 's' : ''}`;
    }
    return `${amount} ${unit}`;
  }
  return arr[1].toString();
}