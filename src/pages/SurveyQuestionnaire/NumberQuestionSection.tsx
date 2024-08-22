import styled from "styled-components";
import { NumberQuestion } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { ContextSection, SurveyH2 } from "./SurveyComponents";
import { Checkbox, Item, NumberField, Picker } from "@adobe/react-spectrum";


const NumberUnitsWrapper = styled.div`
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

const AnswerRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0;
  text-align: center;
  position: relative;
  border-radius: 1em;
  margin: auto;
  padding: 0.5rem;
  width: 100%;
`;

const TextUnit = styled.span`
  font-size: 1.15em;
  margin: 0 0.5em;
`;

function countDecimalPlaces(number: number) {
  const numberString = number.toString();
  const parts = numberString.split('.');

  if (parts.length < 2) {
    return 0;
  }

  return parts[1].length;
}


const NumberQuestionSection = (props: {
  question: NumberQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const [selectedUnit, setSelectedUnit] = useState("0");
  const defaultAnswer = {
    [question.getUnits()[0]]: question.getDefaultValue() || -Infinity,
  }
  const [answer, setAnswer] = useState<{ [key: string]: number } | "unsure">(defaultAnswer);

  const unitTypes = question.getAttributes().scientific_unit ?
    question.getUnits()[Number(selectedUnit)].split(" / ") :
    [question.getUnits()[Number(selectedUnit)]];

  useEffect(() => {
    setAnswer(state.data[question.getQuestionNumber()] || (
      question.getAttributes().optional ? "unsure" : defaultAnswer
    ));
  }, [question])

  useEffect(() => {
    if (answer === "unsure") {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: "unsure"
        }
      })
    }
    else if (answer !== defaultAnswer 
      && Object.values(answer)[0] >= question.getMinValue() 
      && Object.values(answer)[0] <= question.getMaxValue()) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer
        }
      })
    }
  }, [answer])

  useEffect(() => {
    if (!state.data[question.getQuestionNumber()]) return;
    const currentAnswer: number = Object.entries(state.data[question.getQuestionNumber()])[0] as any;
    if (currentAnswer <= question.getMaxValue() && currentAnswer >= question.getMinValue()) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: {
            [unitTypes[Number(selectedUnit)]]: question.getDefaultValue()
          }
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
  }, [selectedUnit]);
  const currentAnswer = question.getAttributes().scientific_unit ?
    1 : (
      state.data[question.getQuestionNumber()] ?
        Object.entries(state.data[question.getQuestionNumber()])[0] as any :
        0
    );

  return (
    <NumberUnitsWrapper>
      {
        question.getAttributes().context ? 
        <ContextSection>{question.getAttributes().context}</ContextSection>
         : null
      }
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <AnswerRowWrapper>
        {
          unitTypes.map((unit, index) => (
            <NumberField
              isDisabled={answer === "unsure"}
              aria-label={unit}
              formatOptions={{
                minimumFractionDigits: 0,
                maximumFractionDigits: countDecimalPlaces(question.getAttributes().step) || 0,
              }}
              step={question.getAttributes().step || 1}
              label={unitTypes.length > 1 ? unit : null}
              key={index}
              value={answer !== "unsure" && answer[unit] ? answer[unit] : 0}
              minValue={question.getMinValue()}
              maxValue={question.getMaxValue()}
              margin={"0 1em"}
              onChange={(num) => {
                setAnswer(curr => {
                  if (curr !== "unsure") {
                    return ({
                      ...curr,
                      [unit]: num
                    })
                  }
                  return curr;
                })
              }}
            />
          ))
        }

        {
          question.getUnits().length > 1 ? (
            <Picker
              aria-label="Choose frequency"
              selectedKey={selectedUnit}
              margin={"0 1em"}
              isDisabled={answer === "unsure"}
              onSelectionChange={(unit) => {
                setSelectedUnit(unit as string);
              }}>
              {
                question.getUnits().map((unit, index) => (
                  <Item key={index}>{unit}</Item>
                ))
              }
            </Picker>
          ) : (
            <TextUnit>
              {question.getUnits()[0]}
              {currentAnswer == 1 ? "" : "s"}
            </TextUnit>
          )
        }

      </AnswerRowWrapper>
      {
        question.getAttributes().optional ? (
          <Checkbox isSelected={answer === "unsure"} onChange={val => setAnswer(val ? "unsure" : defaultAnswer)}>Unsure</Checkbox>
        ) : null
      }
    </NumberUnitsWrapper>
  )
}

export default NumberQuestionSection;