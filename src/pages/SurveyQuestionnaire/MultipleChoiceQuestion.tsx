import styled from "styled-components";
import { MultipleChoiceQuestion } from "../../resources/questions/QuestionObject";
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

interface MCPickerProps {
  question: MultipleChoiceQuestion;
}

const MCPicker = (props: MCPickerProps) => {
  const { question } = props;
  const [selectedKey, setSelectedKey] = useState<string | number>();
  const [otherText, setOtherText] = useState("");

  const { state, dispatch } = useAnswerData();
  // const [otherText, setOtherText] = useState("");

  useEffect(() => {
    if (state.data[question.getQuestionNumber()]) {
      const keyList = question.getOptions().map((answer) => `${question.getQuestionNumber()}: ${answer}`);
      if (keyList.includes(state.data[question.getQuestionNumber()]) || !keyList.includes(`${question.getQuestionNumber()}: Yes, other`)) {
        setSelectedKey(state.data[question.getQuestionNumber()]);
      } else {
        setSelectedKey(`${question.getQuestionNumber()}: Yes, other`);
        setOtherText(state.data[question.getQuestionNumber()]);
      }
    }
  }, [question]);

  useEffect(() => {
    let isAnswerOther: boolean = (selectedKey as string)?.includes("Yes, other");
    if (selectedKey && !isAnswerOther) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: selectedKey
        }
      })
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
  }, [selectedKey, otherText]);


  let isAnswerOther: boolean = (selectedKey as string)?.includes("Yes, other");

  return (
    <>
      <Picker
        items={question.getOptions().map((answer, index) => ({ answer, index }))}
        onSelectionChange={setSelectedKey}
        selectedKey={selectedKey}
        aria-label={question.getQuestion() + " options"}
      >
        {
          (item) => <Item key={`${question.getQuestionNumber()}: ${item.answer}`}>
            {item.answer}
          </Item>
        }
      </Picker>
      {
        isAnswerOther ? (
          <TextField label="Other"
            value={otherText}
            onChange={setOtherText}
            inputMode={"text"}
          />
        ) : null
      }
    </>
  )
}

interface MCSelectorProps {
  question: MultipleChoiceQuestion;
}

const MCSelector = (props: MCSelectorProps) => {
  const { question } = props;
  const [selected, setSelected] = useState<Selection>();
  const [otherText, setOtherText] = useState("");
  const { state, dispatch } = useAnswerData();

  useEffect(() => {
    const answer = state.data[question.getQuestionNumber()];
    try {
      if (answer) {
        if (typeof answer === "string") {
          const newSet = new Set<string>();
          newSet.add(`${question.getQuestionNumber()}: ${question.getOptions().reverse()[0]}`);
          setSelected(newSet);
        }
        else {
          setSelected(state.data[question.getQuestionNumber()]);
        }
      }
      // else {
      //   setSelected(undefined);
      // }
    } catch (error) {
      console.error(error);
    }
  }, [question]);

  useEffect(() => {
    let isAnswerOther: boolean = (selected as any)?.currentKey?.includes("Yes, other");
    if (selected && !isAnswerOther) {
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

  if (question.getOptions().length > 6) return;

  if (selected === "all") { return; }
  let isAnswerOther: boolean = (selected as any)?.currentKey?.includes("Yes, other");

  return (
    <>
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
      {
        isAnswerOther ? (
          <TextField label="Other"
            value={otherText}
            onChange={setOtherText}
            inputMode={"text"}
          />
        ) : null
      }
    </>
  )
}

const MultipleChoiceQuestionSection = (props: {
  question: MultipleChoiceQuestion,
  action: (answer: string) => void
}) => {
  const { question } = props;
  const usePicker = question.getOptions().length > 6;

  return (
    <QuestionWrapper>
      {/* {
        question.getAttributes().context ? (
          <ContextSection>{question.getAttributes().context}</ContextSection>
        ) : null
      } */}
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      {
        question.getAttributes().context ? (
          <ContextSection>{question.getAttributes().context}</ContextSection>
        ) : null
      }
      <MultipleChoiceQuestionWrapper className="buttons">
        {
          usePicker ? (
            <MCPicker
              question={question}
            />
          ) : (
            <MCSelector
              question={question}
            />
          )
        }
      </MultipleChoiceQuestionWrapper>
    </QuestionWrapper>
  )
}

export default MultipleChoiceQuestionSection;