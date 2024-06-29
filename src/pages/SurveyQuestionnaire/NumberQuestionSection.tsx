import styled from "styled-components";
import { NumberQuestion } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import { useEffect, useState } from "react";
import { SurveyH2 } from "./SurveyComponenets";
import { Item, NumberField, Picker } from "@adobe/react-spectrum";


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


const NumberQuestionSection = (props: {
  question: NumberQuestion
}) => {
  const { question } = props;
  const { state, dispatch } = useAnswerData();
  const [selectedUnit, setSelectedUnit] = useState("0");
  const defaultAnswer = {
    [question.getUnits()[0]]: question.getDefaultValue()
  }
  const [answer, setAnswer] = useState<{
    [key: string]: number
  }>(defaultAnswer);

  const unitTypes = question.getAttributes().scientific_unit ?
    question.getUnits()[Number(selectedUnit)].split("/") :
    [question.getUnits()[Number(selectedUnit)]];
  console.log(selectedUnit, unitTypes);

  useEffect(() => {
    setAnswer(state.data[question.getQuestionNumber()] || defaultAnswer);
  }, [question])

  useEffect(() => {
    dispatch({
      type: "add_answer",
      payload: {
        questionNumber: question.getQuestionNumber(),
        answer
      }
    })
  }, [answer])

  useEffect(() => {
    dispatch({
      type: "add_answer",
      payload: {
        questionNumber: question.getQuestionNumber(),
        answer: {
          [unitTypes[Number(selectedUnit)]]: question.getDefaultValue()
        }
      }
    })
  }, [selectedUnit])

  return (
    <NumberUnitsWrapper>
      <SurveyH2>{question.getQuestion()}</SurveyH2>
      <AnswerRowWrapper>
        {
          unitTypes.map((unit, index) => (
            <NumberField
              aria-label={unit}
              formatOptions={{
                minimumFractionDigits: 1,
                maximumFractionDigits: 2,
              }}
              step={question.getAttributes().step || 1}
              label={unitTypes.length > 1 ? unit : null}
              key={index}
              value={answer[unit] || 0}
              minValue={question.getMinValue()}
              maxValue={question.getMaxValue()}
              margin={"0 1em"}
              onChange={(num) => {
                setAnswer(curr => ({
                  ...curr,
                  [unit]: num
                }))
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
            <TextUnit>{question.getUnits()[0]}{
              state.data[question.getQuestionNumber()] === 1 || !question.getAttributes().scientific_unit ? "" : "s"
            }</TextUnit>
          )
        }

      </AnswerRowWrapper>
    </NumberUnitsWrapper>
  )
}

export default NumberQuestionSection;