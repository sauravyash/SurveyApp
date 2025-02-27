import styled from "styled-components";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { ContextSection, SurveyH2 } from "./SurveyComponents";
import { Checkbox, Item, Picker } from "@adobe/react-spectrum";
import NumberField from "../../components/NumberField/NumberField";
import { NumberQuestionV2 } from "../../resources/questions/QuestionTypes/NumberQuestion";


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

const NumberQuestionSection2 = (props: {
  question: NumberQuestionV2
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();

  const [selectedUnitIndex, setSelectedUnitIndex] = useState("0");
  const selectedUnitInt = Number(selectedUnitIndex);
  const [currentUnitTypes, setCurrentUnitTypes] = useState<string[]>([]);

  const unit = currentUnitTypes[selectedUnitInt] || "default";
  const defaultAnswer = {};
  // const defaultAnswer = question.getUnits()[0].split(" / ").length <= 1 ? {
  //   [question.getUnits()[0]]: undefined,
  // } : {};

  const [answer, setAnswer] = useState<NumberQuestionKey>(defaultAnswer);

  useEffect(() => {
    const storedData = state.data[question.getQuestionNumber()];

    if (storedData) {
      const storedAnswer: number = Object.values(storedData)[0] as number;
      const storedFullUnit = Object.keys(storedData).join(" / ");
      const index = question.getUnits().findIndex(unit => unit === storedFullUnit);
      if (index > -1) {
        setSelectedUnitIndex(index.toString());
        if (storedAnswer <= question.getMaxValue(unit)
          && storedAnswer >= question.getMinValue(unit)) {
          setAnswer(storedData);
          return;
        }
        setAnswer({ [unit]: undefined });
        return;
      }
    }
    setSelectedUnitIndex("0");

    const unitTypes = question.getAttributes().scientific_unit ?
      question.getUnits()["0"].split(" / ") :
      [question.getUnits()["0"]];
    setCurrentUnitTypes(unitTypes);

    setAnswer(defaultAnswer);
    dispatch({
      type: "add_answer",
      payload: {
        questionNumber: question.getQuestionNumber(),
        answer: defaultAnswer
      }
    })
  }, [question]);

  useEffect(() => {
    const unitTypes = question.getAttributes().scientific_unit ?
      question.getUnits()[selectedUnitInt].split(" / ") :
      [question.getUnits()[selectedUnitInt]];
    setCurrentUnitTypes(unitTypes);

  }, [selectedUnitIndex]);

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
    else if (answer !== undefined) {
      for (const key in answer) {
        const ans = answer[key];
        if (key === question.getUnits().join(" / ")) continue;
        if (ans === undefined) {
          return;
        }
        if (ans <= question.getMinValue(unit)
          && ans >= question.getMaxValue(unit)
          && ans === answer[key]) {
          return;
        }

      }

      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: question.getQuestionNumber(),
          answer
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
  }, [answer]);

  let currentAnswer;
  if (question.getAttributes().scientific_unit) {
    currentAnswer = 1;
  } else {
    if (!state.data[question.getQuestionNumber()]) {
      currentAnswer = 1;
    } else {
      const a = Object.entries(state.data[question.getQuestionNumber()]);
      if (a.length === 0) {
        currentAnswer = 1;
      } else {
        currentAnswer = a[0][1] as number;
      }
    }
  }

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
          currentUnitTypes.map((unit, index) => (
            <NumberField
              key={index}
              isDisabled={answer === "unsure"}
              aria-label={unit}
              formatOptions={{
                minimumFractionDigits: 0,
                maximumFractionDigits: countDecimalPlaces(question.getStepValue(unit) || 0),
              }}
              step={question.getStepValue(unit) || 1}
              label={currentUnitTypes.length > 1 ? unit : null}
              defaultValue={answer === "unsure" ? undefined : answer[unit]}
              minValue={question.getMinValue(unit)}
              maxValue={question.getMaxValue(unit)}
              margin={"0 1em"}
              onChange={(num) => {
                setAnswer(curr => {
                  if ((curr as any).default !== undefined) {
                    delete (curr as any).default;
                  }
                  if ((curr as any)[question.getUnits()[0]] !== undefined) {
                    delete (curr as any)[question.getUnits()[0]];
                  }
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
              selectedKey={selectedUnitIndex}
              margin={"0 1em"}
              isDisabled={answer === "unsure"}
              onSelectionChange={(unit) => {
                dispatch({
                  type: "remove_answer",
                  payload: {
                    questionNumber: question.getQuestionNumber()
                  }
                })
                setSelectedUnitIndex(unit.toString());
                setAnswer({});
              }}
            >
              {
                question.getUnits().map((unit, index) => (
                  <Item key={index}>{unit}</Item>
                ))
              }
            </Picker>
          ) : (
            currentUnitTypes.length > 1 ? null : (
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

export default NumberQuestionSection2;