import styled from "styled-components";
import { AllQuestions, MultipleChoiceQuestion } from "../../resources/questions/QuestionObject";
import { useEffect, useState } from "react";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { ContextSection, SurveyH2 } from "./SurveyComponents";
import { Item, ListView, Picker, Selection, TextField } from "@adobe/react-spectrum";

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
  flex-direction: column;
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
  action: (answer: string) => void,
  conditions?: {
    question: number;
    answer: string;
  }[]
}) => {
  const { question, conditions } = props;
  const [selected, setSelected] = useState<Selection>();
  const [selectedKey, setSelectedKey] = useState<string | number>();
  const [otherText, setOtherText] = useState("");
  const { state, dispatch } = useAnswerData();

  if (selected === "all") { return; }
  let isAnswerOther: boolean = false;

  if (selectedKey === "Yes, other") {
    isAnswerOther = true;
  } else if (selected && (selected as any)?.currentKey) {
    isAnswerOther = (selected as any)?.currentKey?.includes("Yes, other");
  } 

  useEffect(() => {
    try {
      if (state && state.data[question.getQuestionNumber()]) {
        
        if (typeof state.data[question.getQuestionNumber()] === "string") {
          console.log(state.data[question.getQuestionNumber()]);
          setSelectedKey(state.data[question.getQuestionNumber()]);
          // const set = new Set<string | number>();
          // set.add(question.getOptions().reverse()[0]);
          // setSelected(set);
          setOtherText(state.data[question.getQuestionNumber()] as string);
        } else {
          setSelected(state.data[question.getQuestionNumber()]);
        }
      } else {
        setSelected(state.data[question.getQuestionNumber()]);
      }
    } catch (error) {
      console.error("Multiple Choice Component Data Error:", error);
    }

  }, [question]);

  useEffect(() => {
    if (selected && selected.size > 0 && !isAnswerOther) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: selected
        }
      })
      setOtherText("");
    } else if (isAnswerOther && otherText.length > 1 && otherText.match(/[a-zA-Z]+/)) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: otherText
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

  }, [selected, otherText]);

  useEffect(() => {
    if (selectedKey !== undefined) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: selectedKey
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
  }, [selectedKey]);

  return (
    <QuestionWrapper>
      {
        question.getAttributes().context ? (
          <ContextSection>{question.getAttributes().context}</ContextSection>
        ) : null
      }
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      {
        conditions?.map((condition) => {
          console.log(condition);
          return (
            <span key={condition.question}>
              {AllQuestions.find(q => q.getQuestionNumber() === condition.question)?.getQuestion()} {(condition?.answer as any).currentKey.split(": ").reverse()[0]}
            </span>
          )
        })
      }
      <MultipleChoiceQuestionWrapper className="buttons">
        {
          question.getOptions().length > 6 ? (
            <Picker
              items={question.getOptions().map((answer, index) => ({ answer, index }))}
              onSelectionChange={setSelectedKey}
              selectedKey={selectedKey}
            >
              {
                (item) => <Item key={`${question.getQuestionNumber()}: ${item.answer}`}>
                  {item.answer}
                </Item>
              }
            </Picker>
          ) : (
            <ListView
              minWidth="size-6000"
              density={question.getOptions().length > 4 ? "compact" : "spacious"}
              overflowMode="wrap"
              aria-label={question.getQuestion() + " options"}
              selectionMode="single"
              selectionStyle="checkbox"
              items={question.getOptions().map((answer, index) => ({ answer, index }))}
              selectedKeys={selected}
              onSelectionChange={(keys: Selection) => setSelected(keys)}
            >
              {(item) => (
                <Item key={`${question.getQuestionNumber()}: ${item.answer}`}>
                  {item.answer}
                </Item>
              )}
            </ListView>
          )
        }
        {
          isAnswerOther ? (
            <TextField label="Other"
              value={otherText}
              onChange={setOtherText}
              inputMode={"text"}
            />
          ) : null
        }
      </MultipleChoiceQuestionWrapper>
    </QuestionWrapper>
  )
}

export default MultipleChoiceQuestionSection;