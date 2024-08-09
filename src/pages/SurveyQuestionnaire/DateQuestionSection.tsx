import { DateField } from "@adobe/react-spectrum";
import { SurveyH2 } from "./SurveyComponenets";
import { DateQuestion } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { parseDate } from '@internationalized/date';

const DateQuestionSection = ({ question }: {
  question: DateQuestion
}) => {
  const { dispatch, state } = useAnswerData();
  
  let [selectedDate, setSelectedDate] = useState(parseDate('1980-01-01'));
  console.log(selectedDate);
  
  useEffect(() => {
    console.log(state.data);
    
    if (state && state.data[question.getQuestionNumber()]) {
      try {
        const date = state.data[question.getQuestionNumber()];
        if (date) {
          console.log(date);
          
          setSelectedDate(date);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [question]);

  useEffect(() => {
    dispatch({
      type: "add_answer",
      payload: {
        questionNumber: question.getQuestionNumber(),
        answer: selectedDate
      }
    })
  }, [selectedDate]);

  return (
    <div>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <DateField
        label={"Date Picker: " + question.getQuestion()}
        value={selectedDate}
        onChange={setSelectedDate} 
      />
    </div>
  );
}

export default DateQuestionSection;