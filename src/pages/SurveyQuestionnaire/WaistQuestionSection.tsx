import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { AllQuestions, MultipleChoiceQuestion, WaistMeasurementQuestion } from "../../resources/questions/QuestionObject";
import MultipleChoiceQuestionSection from "./MultipleChoiceQuestion";

const SpecialAnswerData = {
  "age": 1,
  "gender": 3
};

const WaistQuestionSection = (props: {
  question: WaistMeasurementQuestion
}) => {
  const { question } = props;
  const { state } = useAnswerData();
  // default on males for extra gender options
  const gender = state.data[SpecialAnswerData.gender] === "Female" ? "female" : "male";


  const options: string[] = [];
  const conditions: {question: number, answer: string}[] = [];

  question.getOptions().forEach((optionSet) => {
    if (options.length > 0) {
      return;
    }

    if (optionSet.conditions === "default") {
      options.push(...optionSet[gender]);
      return;
    }
    const passedAllConditions = optionSet.conditions.some((condition) => {
      let currentAnswer = state.data[condition.question];
      if (typeof currentAnswer === "string" && currentAnswer.includes(": ")) {
        currentAnswer = currentAnswer.split(": ")[1];
      }
      if (currentAnswer instanceof Set && (currentAnswer as any).currentKey.includes(": ")) {
        currentAnswer = (currentAnswer as any).currentKey.split(": ")[1];
      }
      console.log("currentAnswer", currentAnswer);
      conditions.push({question: condition.question, answer: currentAnswer});
      // console.log(JSON.stringify(condition), condition.modifier, currentAnswer, condition.answer);
      if (condition.modifier && condition.modifier === "not") {
        console.log("checking not", currentAnswer, condition.answer);
        
        return (currentAnswer !== condition.answer)
      }
      return (currentAnswer === condition.answer)
    })
    console.log("passedAllConditions", passedAllConditions);
    
    
    if (passedAllConditions) {
      options.push(...optionSet[gender])
    }
  })

  return (
    <>
      {
        conditions.map((condition) => {
          return (
            <div key={condition.question}>
              <p>{AllQuestions.find(q => q.getQuestionNumber() === condition.question)?.getQuestion()} {condition.answer}</p>
            </div>
          )
        })
      }
      <MultipleChoiceQuestionSection
        question={
          new MultipleChoiceQuestion(
            question.getQuestionNumber(),
            question.getQuestion(),
            options
          )
        }
        action={(): void => { }}
      />
    </>
  )
}

export default WaistQuestionSection;