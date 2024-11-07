import React, { useEffect, useState } from 'react';
import { SurveyH2 } from './SurveyComponents';
import { Checkbox, TextArea } from '@adobe/react-spectrum';
import { useAnswerData } from '../../reducers/AnswerDataProvider';
import { TextQuestion } from '../../resources/questions/QuestionTypes';

interface TextQuestionProps {
  currentQuestion: TextQuestion,
}

const TextQuestionSection: React.FC<TextQuestionProps> = ({ currentQuestion }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { dispatch, state } = useAnswerData();

  useEffect(() => {
    if (isSelected) {
      dispatch({
        type: "add_answer",
        payload: {
          questionNumber: currentQuestion.getQuestionNumber(),
          answer: currentQuestion.getDisplayNoneCheckbox() === true ? "None" : (currentQuestion.getDisplayNoneCheckbox() as string),
        }
      });
    }
  }, [isSelected]);
  const defaultValue = state.data[currentQuestion.getQuestionNumber()] || "";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}>
      <SurveyH2>{currentQuestion.getQuestion()}</SurveyH2>
      <TextArea
        width="size-4600"
        isDisabled={isSelected}
        defaultValue={defaultValue}
        aria-label={`Question ${currentQuestion.getQuestionNumber()}`}
        onChange={(value: string) => {
          dispatch({
            type: "add_answer",
            payload: {
              questionNumber: currentQuestion.getQuestionNumber(),
              answer: value
            }
          });
        }}
      />
      {
        currentQuestion.getDisplayNoneCheckbox() ? (
          <Checkbox isSelected={isSelected} onChange={val => setIsSelected(val)}>
            {
              (currentQuestion.getDisplayNoneCheckbox() !== true) ?
                currentQuestion.getDisplayNoneCheckbox() :
                "None"
            }
          </Checkbox>
        ) : null
      }
    </div>
  );
};

export default TextQuestionSection;