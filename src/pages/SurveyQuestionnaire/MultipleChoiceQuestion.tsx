import styled from "styled-components";
import { MultipleChoiceQuestion } from "../../resources/questions/QuestionObject";
import { useEffect, useState } from "react";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { SurveyH2 } from "./SurveyComponenets";
import { Item, ListView, Selection } from "@adobe/react-spectrum";

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
  overflow: auto;
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
`;

const MultipleChoiceQuestionSection = (props: {
  question: MultipleChoiceQuestion,
  action: (answer: string) => void
}) => {
  const { question } = props;
  const [selected, setSelected] = useState<Selection>();
  const { state, dispatch } = useAnswerData();

  useEffect(() => {
    if (state && state.data[question.getQuestionNumber()]) {
      console.log(state.data[question.getQuestionNumber()]);
      setSelected(state.data[question.getQuestionNumber()]);
    } else {
      setSelected(undefined);
    }
  }, [question]);

  useEffect(() => {
    dispatch({
      type: "add_answer",
      payload: {
        questionNumber: question.getQuestionNumber(),
        answer: selected
      }
    })
  }, [selected]);
  return (
    <QuestionWrapper>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <MultipleChoiceQuestionWrapper className="buttons">
        <ListView
          minWidth="size-6000"
          density="spacious"
          aria-label={question.getQuestion() + " options"}
          selectionMode="single"
          selectionStyle="checkbox"
          items={question.getOptions().map((answer, index) => ({answer, index}))}
          selectedKeys={selected}
          onSelectionChange={(keys: Selection) => setSelected(keys)}
        >
          {(item) => (
            <Item key={item.answer}>
              {item.answer}
            </Item>
          )}
        </ListView>
      </MultipleChoiceQuestionWrapper>
    </QuestionWrapper>
  )
}

export default MultipleChoiceQuestionSection;