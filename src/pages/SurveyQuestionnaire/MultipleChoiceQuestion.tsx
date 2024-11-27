import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { ContextSection, SurveyH2 } from "./SurveyComponents";
import { Item, ListView, Picker, Selection, TextField } from "@adobe/react-spectrum";
import { MultipleChoiceQuestion } from "../../resources/questions/QuestionTypes";

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
  padding: 0 2rem;
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

const otherCategoryText = ["Yes, other", "Other", "Other (please specify)", "Other identity"];

interface MCPickerProps {
  question: MultipleChoiceQuestion;
}

const MCPicker = (props: MCPickerProps) => {
  const { question } = props;
  const [selectedKey, setSelectedKey] = useState<string | number>();
  const [otherText, setOtherText] = useState("");

  const { state, dispatch } = useAnswerData();

  let isAnswerOther = () => {
    let key = selectedKey as string
    if (key && key.includes(": ")) {
      key = key.split(": ")[1];
    }
    return otherCategoryText.includes(key)
  };

  useEffect(() => {
    if (state.data[question.getQuestionNumber()]) {
      const keyList = question.getOptions().map((answer) => `${question.getQuestionNumber()}: ${answer}`);
      if (keyList.includes(state.data[question.getQuestionNumber()])) {
        setSelectedKey(state.data[question.getQuestionNumber()])
      } else {
        const [key, otherText] = state.data[question.getQuestionNumber()].split("::");
        setSelectedKey(key);
        if (otherText) setOtherText(otherText);
      }
    }
  }, [question]);

  useEffect(() => {

    if (selectedKey && !isAnswerOther()) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: selectedKey
        }
      })
    } else if (isAnswerOther() && otherText.length > 1 && otherText.match(/[a-zA-Z]+/)) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: `${selectedKey}::${otherText}`
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


  return (
    <>
      <Picker
        items={question.getOptions().map((answer, index) => ({ answer, index }))}
        onSelectionChange={setSelectedKey}
        selectedKey={selectedKey}
        aria-label={"Question " + question.getQuestion() + " Options"}
      >
        {
          (item) => <Item key={`${question.getQuestionNumber()}: ${item.answer}`}>
            {item.answer}
          </Item>
        }
      </Picker>
      {
        isAnswerOther() ? (
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

  let isAnswerOther = () => {
    const keys = (selected as Set<string>)?.keys()
    if (keys) {
      const key = Array.from(keys)[0]
      if (key && key.includes(": ")) {
        return otherCategoryText.includes(key.split(": ")[1]);
      }
    }
  };

  useEffect(() => {
    const answer = state.data[question.getQuestionNumber()];
    try {
      if (answer) {
        if (typeof answer === "string") {
          const keyList = question.getOptions().map((answer) => `${question.getQuestionNumber()}: ${answer}`);
          if (keyList.includes(state.data[question.getQuestionNumber()])) {
            const newSet = new Set<string>();
            newSet.add(`${question.getQuestionNumber()}: ${question.getOptions()[0]}`);
            setSelected(newSet);
          } else {
            const newSet = new Set<string>();
            const [key, other] = state.data[question.getQuestionNumber()].split("::");
            newSet.add(`${question.getQuestionNumber()}: ${key.trim()}`);
            setSelected(newSet);
            if (other) setOtherText(other);
          };
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
    if (selected && !isAnswerOther()) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: selected
        }
      })
      setOtherText("");
    } else if (isAnswerOther() && otherText.length > 1 && otherText.match(/[a-zA-Z]+/)) {
      const otherWord = question.getOptions().reduce((acc, curr) => {
        if (otherCategoryText.includes(curr)) {
          return curr;
        }
        return acc;
      }, "");
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: `${otherWord}::${otherText}`
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
        isAnswerOther() ? (
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