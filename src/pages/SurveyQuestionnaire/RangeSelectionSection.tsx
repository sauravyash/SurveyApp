import { Radio, RadioGroup } from '@adobe/react-spectrum';
import { RangeSelectionQuestion } from '../../resources/questions/QuestionObject';
import styled from 'styled-components';
import { SurveyH2 } from './SurveyComponenets';
import { useAnswerData } from '../../reducers/AnswerDataProvider';
import { useEffect, useState } from 'react';

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  text-align: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 0;
`;

const RadioGroupWrapper = styled.div`
  font-size: 1.5em;
`

const RangeSelectionSection = (props: {
  question: RangeSelectionQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const defaultAnswer = "";
  const [selectedValue, setSelectedValue] = useState(defaultAnswer);

  useEffect(() => {
    setSelectedValue(state.data[question.getQuestionNumber()] || defaultAnswer)
  }, [question, state]);

  return (
    <QuestionWrapper>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <RadioGroupWrapper>
        <RadioGroup name={`question-${question.getQuestionNumber()}`} orientation="vertical"
          onChange={(value) => {
            setSelectedValue(value);
            dispatch({
              type: "add_answer",
              payload: {
                questionNumber: question.getQuestionNumber(),
                answer: value
              }
            })
          }}
          defaultValue={selectedValue || defaultAnswer}
          value={selectedValue}
        >
        {Object.entries(question.getOptions()).map((option) => (
          <Radio  key={option[0]} value={option[0]} aria-label={`${option} for question ${question.getQuestionNumber()}`}>{option[1]}</Radio>
        ))}
      </RadioGroup>
      </RadioGroupWrapper>
    </QuestionWrapper>
  );
};

export default RangeSelectionSection;