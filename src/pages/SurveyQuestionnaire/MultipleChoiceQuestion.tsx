import styled from "styled-components";
import { MultipleChoiceQuestion } from "../../resources/questions/QuestionObject";
import { useEffect, useState } from "react";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { SurveyH2 } from "./SurveyComponenets";

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
  padding: 2rem;
`;

const MultipleChoiceQuestionWrapper = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 2rem;
  max-width: 60%;
`;

const MultipleChoiceQuestionSection = (props: {
  question: MultipleChoiceQuestion,
  action: (answer: string) => void
}) => {
  const { question, action } = props;
  const [selected, setSelected] = useState("");
  const { state, dispatch } = useAnswerData();

  useEffect(() => {
    setSelected("");
    if (state.data[question.getQuestionNumber()]) {
      setSelected(state.data[question.getQuestionNumber()]);
    }
  }, [question]);

  return (
    <QuestionWrapper>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <MultipleChoiceQuestionWrapper className="buttons">
        {
          question.getOptions().map((answer, index) =>

            <button
              key={index}
              className={[
                'button', 
                selected === answer ? "is-success" : "is-info",
                state.largeTextMode ? "is-large" : ""
              ].join(' ')}
              onClick={() => {
                setSelected(answer)
                action(answer)
                dispatch({
                  type: "add_answer",
                  payload: {
                    questionNumber: question.getQuestionNumber(),
                    answer: answer
                  }
                })
              }}

            >{answer}</button>
          )
        }
      </MultipleChoiceQuestionWrapper>
    </QuestionWrapper>
  )
}

export default MultipleChoiceQuestionSection;