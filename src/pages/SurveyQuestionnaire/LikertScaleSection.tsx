// import { Radio, RadioGroup } from '@adobe/react-spectrum';
import styled from 'styled-components';
// import { SurveyH2 } from './SurveyComponents';
import { useAnswerData } from '../../reducers/AnswerDataProvider';
import { useEffect, useState } from 'react';
import LikertComponent from '../../components/LikertComponent';
import { LikertScaleQuestion } from '../../resources/questions/QuestionTypes';
import { Subtitle } from '../../components/Headings';
import Markdown from 'react-markdown';

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
  // height:100%;
`;

const LikertScaleSection = (props: {
  question: LikertScaleQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const [defaultLikertAnswers, setDefaultLikertAnswers] = useState<{ [key: string]: string }>({});
 

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
      <Subtitle><Markdown>{question.getQuestion()}</Markdown></Subtitle>
      <LikertComponent
        setExternalData={setData}
        value={{
          options: Object.values(question.getOptions()),
          questions: question.getQuestionList()
        }}
        defaultAnswers={defaultLikertAnswers}
      />
    </QuestionWrapper>
  );
};

export default LikertScaleSection;