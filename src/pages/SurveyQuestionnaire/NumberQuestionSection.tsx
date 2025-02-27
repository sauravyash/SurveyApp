import styled from "styled-components";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { ContextSection, SurveyH2 } from "./SurveyComponents";
import { Checkbox, Item, Picker } from "@adobe/react-spectrum";
import NumberField from "../../components/NumberField/NumberField";
import { NumberQuestion } from "../../resources/questions/QuestionTypes";


const NumberUnitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;
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

type NumberQuestionKey = { [key: string]: number | undefined } | "unsure";

const NumberQuestionSection = (props: {
  question: NumberQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const [selectedUnit, setSelectedUnit] = useState("0");
  const [hasLoadedState, setHasLoadedState] = useState(false);
  const [hasLoadedUnits, setHasLoadedUnits] = useState(false);
  const unitTypes = question.getAttributes().scientific_unit ?
    question.getUnits()[Number(selectedUnit)].split(" / ") :
    [question.getUnits()[Number(selectedUnit)]];

  const defaultAnswer = unitTypes.length <= 1 ? {
    [question.getUnits()[0]]: undefined,
  } : {
    [unitTypes[0]]: undefined,
  }
  const [answer, setAnswer] = useState<NumberQuestionKey>(defaultAnswer);



  useEffect(() => {
    const ans = state.data[question.getQuestionNumber()] || defaultAnswer;
    if (question.getUnits().length > 1 && Object.entries(ans)[0][1] === -Infinity) {
      setAnswer(defaultAnswer);
    } else {
      setAnswer(ans);
    }
  }, [question]);

  useEffect(() => {
    const answ = Object.values(answer)[0];
    if (answer === "unsure") {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer: "unsure"
        }
      })
    }
    else if (answ !== undefined
      && answ !== Object.values(defaultAnswer)[0]
      && answ >= question.getMinValue()
      && answ <= question.getMaxValue()) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer
        }
      })
    } else {
      if (hasLoadedState && hasLoadedUnits) {
        dispatch({
          type: "remove_answer",
          payload: {
            questionNumber: question.getQuestionNumber()
          }
        })
      } else {
        setHasLoadedState(true);
      }
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
      if (hasLoadedState && hasLoadedUnits) {
        dispatch({
          type: "remove_answer",
          payload: {
            questionNumber: question.getQuestionNumber()
          }
        })
      } else {
        setHasLoadedUnits(true);
      }
    }
  }, [selectedUnit]);

  const currentAnswer = question.getAttributes().scientific_unit ?
    1 : (
      state.data[question.getQuestionNumber()] ?
        Object.entries(state.data[question.getQuestionNumber()])[0][1] as any :
        0
    ) || 1;

  const unit = unitTypes[Number(selectedUnit)];


  return (
    <NumberUnitsWrapper>
      {
        question.getAttributes().context && question.getAttributes().contextLocation === "above" ?
          <ContextSection>{question.getAttributes().context}</ContextSection>
          : null
      }
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <AnswerRowWrapper>
        {
          unitTypes.map((unit, index) => (
            <NumberField
              key={index}
              isDisabled={answer === "unsure"}
              aria-label={unit}
              formatOptions={{
                minimumFractionDigits: 0,
                maximumFractionDigits: countDecimalPlaces(question.getAttributes().step) || 0,
              }}
              step={question.getAttributes().step || 1}
              label={unitTypes.length > 1 ? unit : null}
              defaultValue={answer === "unsure" ? undefined : answer[unit]}
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
            unitTypes.length > 1 ? null : (
              <TextUnit>
                {question.getUnits()[0]}
                {currentAnswer == 1 ? "" : "s"}
              </TextUnit>
            )
          )
        }

      </AnswerRowWrapper>
      {
        question.getAttributes().optional ? (
          <Checkbox isSelected={answer === "unsure"} onChange={val => setAnswer(val ? "unsure" : defaultAnswer)}>Unsure</Checkbox>
        ) : null
      }
      {
        question.getDisplayNoneCheckbox() ? (
          <Checkbox isSelected={answer !== "unsure" && answer[unit] === 0} onChange={val => setAnswer(val ? { [unit]: 0 } : defaultAnswer)}>
            {
              (question.getDisplayNoneCheckbox() !== true) ?
                question.getDisplayNoneCheckbox() :
                "None"
            }
          </Checkbox>
        ) : null
      }
      {
        question.getAttributes().context && question.getAttributes().contextLocation === "below" ?
          <ContextSection>{question.getAttributes().context}</ContextSection>
          : null
      }
    </NumberUnitsWrapper>
  )
}

export default NumberQuestionSection;