import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { MultipleChoiceQuestion, WaistMeasurementQuestion } from "../../resources/questions/QuestionObject";
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
      conditions.push({question: condition.question, answer: state.data[condition.question]});
      // console.log(condition, condition.modifier, state.data, state.data[condition.question], condition.answer);
      if (condition.modifier && condition.modifier === "not") {
        return (state.data[condition.question] !== condition.answer)
      }
      return (state.data[condition.question] === condition.answer)
    })
    
    if (passedAllConditions) {
      options.push(...optionSet[gender])
    }
  })

  return (
    <>
      <h3></h3>
      
      <MultipleChoiceQuestionSection
        question={
          new MultipleChoiceQuestion(
            question.getQuestionNumber(),
            question.getQuestion(),
            options
          )
        }
        conditions={conditions}
        action={(): void => { }}
      />
    </>
  )
}

export default WaistQuestionSection;