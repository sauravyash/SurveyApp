import { useEffect, useState } from "react"
import { DateField, defaultTheme, Provider, Button as AdobeButton, TextField } from '@adobe/react-spectrum';
import { parseDate } from '@internationalized/date';

import Loading from "../../components/Loading";
import styled from "styled-components";
import { ButtonWrapper } from "../../components/Button";
import questionSections, { MultipleChoiceQuestion, NumberQuestion, RangeSelectionQuestion, WaistMeasurementQuestion } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import imageList from "../../resources/stockImageList";
import { useNavigate } from "react-router-dom";
import MultipleChoiceQuestionSection from "./MultipleChoiceQuestion";
import WaistQuestionSection from "./WaistQuestionSection";
import NumberQuestionSection from "./NumberQuestionSection";
import RangeSelectionSection from "./RangeSelectionSection";

const SurveyPage = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #fff;
  position: relative;
`;

const SurveyWrapper = styled.div`
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
  border: 1px solid #000;
  min-width: 60%;
  min-height: 60%;
  max-width: 90%;
`;

const SurveyH1 = styled.h1`
  font-size: 3em;
  text-align: center;
  margin: 1rem 0 0;
  color: #000;
`;

const SurveyH2 = styled.h2`
  font-size: 2em;
  text-align: center;
  margin: 0.5rem auto;
  color: #000;
`;

const AnswerColWrapper = styled.div`
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
  padding: 0.5rem;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.2) blur(2px);
`;


const SurveyQuestionnaire = () => {
  const [currentSection, setCurrentSection] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isAnswerValidated, setAnswerValidated] = useState(false);
  const [bgImage, setBgImage] = useState(imageList[0]);
  const { state, dispatch } = useAnswerData();
  const navigate = useNavigate();

  const sectiontitle = questionSections[currentSection]?.title;

  useEffect(() => {
    setLoadingPage(true);
    setBgImage(imageList[currentPage % imageList.length]);
    // random: 
    // setBgImage(imageList[Math.floor(Math.random() * imageList.length)]);
    setLoadingPage(false);
    let hashAddress = "#survey-completed"
    if (currentSection < questionSections.length) {
      hashAddress = '#question-' + questionSections[currentSection].questions[currentPage].getQuestionNumber()
    }
    history.pushState(null, "", hashAddress);
  }, [currentPage]);

  useEffect(() => {
    if (currentSection < questionSections.length) {
      const currentQuestion = questionSections[currentSection].questions[currentPage];
      console.log(state.data[currentQuestion.getQuestionNumber()]);
      
      if (state.data[currentQuestion.getQuestionNumber()]) {
        setAnswerValidated(true);
      } else {
        setAnswerValidated(false);
      }
    }
  }, [state, currentSection, currentPage])

  if (currentSection >= questionSections.length) {
    return (
      <Provider theme={defaultTheme} colorScheme="light">
        <SurveyPage>
          <SurveyWrapper>
            <SurveyH1>Thank you for completing the survey!</SurveyH1>
            <ButtonWrapper>
              <AdobeButton
                variant="accent"
                onPress={() => {
                  navigate("/summary")
                }}

              >
                Submit Your Answers
              </AdobeButton>
            </ButtonWrapper>
          </SurveyWrapper>
        </SurveyPage>
      </Provider>
    )
  }
  const currentQuestion = questionSections[currentSection].questions[currentPage];

  const passedConditionCheck = (section: number, page: number) => 
    questionSections[section].questions[page].getConditions().every((condition) => {
    return state.data[condition.question] === condition.answer;
  });

  const handlePreviousQuestion = () => {
    let newPage = currentPage - 1;
    let newSection = currentSection;
    if (newPage < 0) {
      newSection = currentSection - 1;
      newPage = questionSections[newSection].questions.length - 1;
    }

    if (!passedConditionCheck(newSection, newPage)) {
      newPage -= 1;
      if (newPage < 0) {
        newSection = currentSection - 1;
        newPage = questionSections[newSection].questions.length - 1;
      }
    }

    setCurrentSection(currentSection);
    setCurrentPage(newPage)
  }

  const handleNextQuestion = () => {
    let newPage = currentPage + 1;
    let newSection = currentSection;
    if (newPage >= questionSections[newSection].questions.length) {
      newSection += 1;
      newPage = 0;
    }

    if (!passedConditionCheck(currentSection, newPage)) {
      newPage += 1;
      if (newPage >= questionSections[newSection].questions.length) {
        newSection += 1;
        newPage = 0;
      }
    }
    setCurrentSection(newSection);
    setCurrentPage(newPage % questionSections[currentSection].questions.length)
  }

  if (loadingPage) {
    return (
      <Loading />
    )
  }

  let question = (<div></div>);

  switch (currentQuestion.getType()) {
    case "multiple-choice":
      question = (
        <MultipleChoiceQuestionSection
          question={currentQuestion as MultipleChoiceQuestion}
          action={(): void => {
            // handleNextQuestion();
          }}
        />
      )
      break;

    case "text":
      question = (
        <div>
          <SurveyH2>{currentQuestion.getQuestion()}</SurveyH2>
          <TextField onChange={(value: string) => {
            dispatch({
              type: "add_answer",
              payload: {
                questionNumber: currentQuestion.getQuestionNumber(),
                answer: value
              }
            })
          }} />
        </div>
      )
      break;
    case "number":
      question = (
        <NumberQuestionSection
          question={currentQuestion as NumberQuestion}
        />
      )
      break;
    case "date":
      const oldValue = state.data[currentQuestion.getQuestionNumber()] ?
        state.data[currentQuestion.getQuestionNumber()] :
        parseDate('1980-01-01')
      question = (
        <div>
          <SurveyH2>{currentQuestion.getQuestion()}</SurveyH2>
          <DateField
            label={"Date Picker: " + currentQuestion.getQuestion()}
            defaultValue={oldValue}
            onChange={(date) => {
              dispatch({
                type: "add_answer",
                payload: {
                  questionNumber: currentQuestion.getQuestionNumber(),
                  answer: date
                }
              })
            }} />
        </div>
      )
      break;

    case "waist-measurement":
      question = (
        <WaistQuestionSection question={currentQuestion as WaistMeasurementQuestion} />
      )
      break;
    case "range-selection":
      question = (
        <RangeSelectionSection question={currentQuestion as RangeSelectionQuestion} />
      )
      break;

    default:
      break;
  }

  return (
    <Provider>
      <SurveyPage>
        <BackgroundImage src={bgImage} />
        <SurveyWrapper>
          <SurveyH1>{sectiontitle}: Question {currentQuestion.getQuestionNumber()}</SurveyH1>
          <AnswerColWrapper>
            {question}
          </AnswerColWrapper>
          <ButtonWrapper>
            {
              currentPage === 0 && currentSection === 0 ? null :
                <AdobeButton variant="primary" style="fill" onPress={handlePreviousQuestion}>
                  Previous Question
                </AdobeButton>
            }
            <AdobeButton
              variant="accent"
              onPress={handleNextQuestion}
              isDisabled={!isAnswerValidated}
            >
              Next Question
            </AdobeButton>
          </ButtonWrapper>
        </SurveyWrapper>
      </SurveyPage>
    </Provider>
  )

}

export default SurveyQuestionnaire;