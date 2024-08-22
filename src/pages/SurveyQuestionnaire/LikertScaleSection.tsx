// import { Radio, RadioGroup } from '@adobe/react-spectrum';
import { LikertScaleQuestion } from '../../resources/questions/QuestionObject';
import styled from 'styled-components';
// import { SurveyH2 } from './SurveyComponents';
import { useAnswerData } from '../../reducers/AnswerDataProvider';
import { useEffect, useState } from 'react';
import LikertComponent from '../../components/LikertComponent';

const QuestionWrapper = styled.div`
  display: block;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-evenly;
  // align-items: center;
  padding: 0;
  text-align: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 1rem;
  height:100%;
`;

// const RadioGroupWrapper = styled.div`
//   font-size: 1.5em;
// `

const LikertScaleSection = (props: {
  question: LikertScaleQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const [defaultLikertAnswers, setDefaultLikertAnswers] = useState<{ [key: string]: string }>({});
  // const defaultAnswer = "";
  // const [selectedValue, setSelectedValue] = useState(defaultAnswer);
  // useEffect(() => {
  //   setSelectedValue(state.data[question.getQuestionNumber()] || defaultAnswer);
  // }, [question, state]);

  useEffect(() => {
    const [min, max] = [question.getQuestionNumber(), question.getQuestionNumber() + question.getQuestionList().length];
    setDefaultLikertAnswers(Object.entries(state.data).reduce((prev, curr) => {
      const [q, value] = curr;
      const numQ = Number(q);
      if (numQ < question.getQuestionNumber()) return prev; // Skip if the question number is less than the current q 
      if (numQ && value && numQ >= min && numQ < max) {
        const relativeIndex = numQ - min;
        return { ...prev, [question.getQuestionList()[relativeIndex]]: value };
      }
      return prev;
    }, {} as any));
  }, [question]);

  const setData = (data: any) => {
    const answers = Object.entries(data).map(([q, value]) => {
      return {
        questionNumber: question.getQuestionList().indexOf(q) + question.getQuestionNumber(),
        question: q,
        answer: value
      }
    });
    for (const answer of answers) {
      if (answer.answer) {
        dispatch({
          type: "add_answer",
          payload: answer
        });
      }
    }
  }

  return (
    <QuestionWrapper>
      <LikertComponent
        setExternalData={setData}
        value={{
          options: Object.values(question.getOptions()),
          questions: question.getQuestionList()
        }}
        defaultAnswers={defaultLikertAnswers}
      />
      {/* <SurveyH2>{question.getQuestion()}</SurveyH2> */}
      {/* <RadioGroupWrapper>
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
          <Radio key={option[0]} value={option[0]} aria-label={`${option} for question ${question.getQuestionNumber()}`}>{option[1]}</Radio>
        ))}
      </RadioGroup>
      </RadioGroupWrapper> */}
    </QuestionWrapper>
  );
};

export default LikertScaleSection;