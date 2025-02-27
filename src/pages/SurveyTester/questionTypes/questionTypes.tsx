import {  FormGroup } from "@mui/material";
import { BaseQuestionObject, DateQuestion, LikertScaleQuestion, MultipleChoiceQuestion, NumberQuestion, TextQuestion, WaistMeasurementQuestion } from "../../../resources/questions/QuestionTypes";
import WaistQuestionSection from "../../SurveyQuestionnaire/WaistQuestionSection";
import LikertScaleSection from "../../SurveyQuestionnaire/LikertScaleSection";
import NumberQuestionSection from "../../SurveyQuestionnaire/NumberQuestionSection";
import NumberQuestionSection2 from "../../SurveyQuestionnaire/NumberQuestionSection2";
import { NumberQuestionV2 } from "../../../resources/questions/QuestionTypes/NumberQuestion";
import TextQuestionSection from "../../SurveyQuestionnaire/TextQuestionSection";
import DateQuestionSection from "../../SurveyQuestionnaire/DateQuestionSection";
import MultipleChoiceQuestionSection from "../../SurveyQuestionnaire/MultipleChoiceQuestion";

const AnswerModule = (props: { question: BaseQuestionObject }) => {
  return (
    <FormGroup>
      <Answer question={props.question} />
    </FormGroup>
  );
}

const Answer = (props: { question: BaseQuestionObject }) => {
  const { question } = props;
  const questionType = question.getType();

  switch (questionType) {
    case 'likert-scale':
      return (
        <LikertScaleSection question={question as LikertScaleQuestion} />
      )
    case "multiple-choice":
      const q = question as MultipleChoiceQuestion;
      return (
        <MultipleChoiceQuestionSection question={q} action={() => {}} />
      )

    case "number":
      return (
        <NumberQuestionSection question={question as NumberQuestion} />
      )
    case "number2":
      return (
        <NumberQuestionSection2 question={question as NumberQuestionV2} />
      )

    case "text":
      return (
        <TextQuestionSection currentQuestion={question as TextQuestion} />
      )

    case "date":
      return (
        <DateQuestionSection question={question as DateQuestion} />
      )

    case "waist-measurement":
      return (
        WaistQuestionSection({ question: question as WaistMeasurementQuestion })
      )

    case "section-intro":
      return (<p></p>);

    default:
      console.log(question.getQuestionNumber(), questionType);
      break;
  }
  return (
    <div>
      <p>Answer Module Broken</p>
    </div>
  )
};

export default AnswerModule;