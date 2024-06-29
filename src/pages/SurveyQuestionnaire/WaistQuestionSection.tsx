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
  console.log(state.data[SpecialAnswerData.gender]);
  

  const options: string[] = [];

  question.getOptions().forEach((optionSet) => {
    if (options.length > 0) {
      return;
    }

    if (optionSet.conditions === "default") {
      options.push(...optionSet[gender]);
      return;
    }
    const passedAllConditions = optionSet.conditions.some((condition) => {

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
  )
}

export default WaistQuestionSection;