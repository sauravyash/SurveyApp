import { DateField } from "@adobe/react-spectrum";
import { SurveyH2 } from "./SurveyComponents";
import { DateQuestion } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { parseDate, today, getLocalTimeZone, CalendarDate } from '@internationalized/date';

const DateQuestionSection = ({ question }: {
  question: DateQuestion
}) => {
  const { dispatch, state } = useAnswerData();
  const minDate = parseDate("1899-01-01");
  const maxDate = today(getLocalTimeZone()).subtract({ years: 18 });
  let [selectedDate, setSelectedDate] = useState<CalendarDate | undefined>(undefined);
  
  useEffect(() => {
    if (state && state.data[question.getQuestionNumber()]) {
      try {
        const date = state.data[question.getQuestionNumber()];
        if (date) {
          setSelectedDate(parseDate(date));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [question]);

  const setDate = (value: CalendarDate) => {
    if (value) {
      setSelectedDate(value);
      if (value.compare(minDate) > 0 && value.compare(maxDate) <= 0) {
        dispatch({
          type: "add_answer",
          payload: {
            questionNumber: question.getQuestionNumber(),
            answer: value.toString()
          }
        })
      } else {
        dispatch({
          type: "remove_answer",
          payload: {
            questionNumber: question.getQuestionNumber()
          }
        })
      }
    }
  }  

  return (
    <div>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <DateField
        label={"Date Picker: " + question.getQuestion()}
        defaultValue={selectedDate}
        value={selectedDate}
        onChange={setDate}
        minValue={minDate}
        maxValue={maxDate}
      />
    </div>
  );
}

export default DateQuestionSection;