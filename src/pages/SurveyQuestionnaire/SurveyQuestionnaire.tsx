import { useEffect, useState } from "react"
import { defaultTheme, Provider, Button as AdobeButton, TextField, ButtonGroup, ProgressBar } from '@adobe/react-spectrum';

import Loading from "../../components/Loading";
import styled from "styled-components";
import { ButtonWrapper } from "../../components/Button";
import questionSections, { DateQuestion, MultipleChoiceQuestion, NumberQuestion, LikertScaleQuestion, WaistMeasurementQuestion, AllQuestions } from "../../resources/questions/QuestionObject";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import rawImageList from "../../resources/stockImageList";
import { useNavigate } from "react-router-dom";
import MultipleChoiceQuestionSection from "./MultipleChoiceQuestion";
import WaistQuestionSection from "./WaistQuestionSection";
import NumberQuestionSection from "./NumberQuestionSection";
import LikertScaleSection from "./LikertScaleSection";
import DateQuestionSection from "./DateQuestionSection";
import Markdown from "react-markdown";

const imageList = rawImageList.map((img) => `/images/stock_new/${img}.webp`);

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
  max-height: 90%;
  max-width: 90%;
  overflow: auto;
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
  display: block;
  padding: 0;
  text-align: center;
  position: relative;
  background: #fff;
  border-radius: 1em;
  margin: auto;
  padding: 0.5rem;
  overflow-y: hidden;
  height: 90%;
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

const SurveySectionIntro = styled.div`
  font-size: 2em;
  font-weight: 400;
  text-align: center;
  margin: 1rem auto;
  white-space: pre-wrap;
  `


const SurveyQuestionnaire = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isAnswerValidated, setAnswerValidated] = useState(false);
  const [bgImage, setBgImage] = useState(imageList[0]);
  const { state, dispatch } = useAnswerData();
  const navigate = useNavigate();

  const sectiontitle = questionSections[currentSection]?.title;

  useEffect(() => {
    const currentQuestion = questionSections[currentSection].questions[currentPage];
    setLoadingPage(true);
    setBgImage(imageList[currentPage % imageList.length]);
    // random: 
    // setBgImage(imageList[Math.floor(Math.random() * imageList.length)]);
    setLoadingPage(false);
    let hashAddress = "#survey-completed"
    if (currentSection < questionSections.length) {
      hashAddress = '#question-' + currentQuestion.getQuestionNumber()
    }
    history.pushState(null, "", hashAddress);
    dispatch({ type: "set_current_question", payload: currentQuestion.getQuestionNumber() });
  }, [currentPage]);

  useEffect(() => {
    if (currentSection < questionSections.length) {
      const currentQuestion = questionSections[currentSection].questions[currentPage];
      const questionData = state.data[currentQuestion.getQuestionNumber()];
      if (currentQuestion.getType() === "section-intro") {
        setAnswerValidated(true);
      } else if (currentQuestion.getType() === "likert-scale") {
        const questionSetLength = (currentQuestion as LikertScaleQuestion).getQuestionList().length;
        const startQuestion = (currentQuestion as LikertScaleQuestion).getQuestionNumber();
        for (let i = startQuestion; i < startQuestion + questionSetLength; i++) {
          const qData = state.data[i];
          if (!qData) {
            setAnswerValidated(false);
            return;
          }
        }
        setAnswerValidated(true);
      } else if (questionData) {
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

  const setToString: (set: any) => string = (set: any) => {
    if (!set) return "";
    if (typeof set === "object") {
      // is it a set?
      if (set[Symbol.iterator] === "function") {
        return [...set][0];
      }
      // is it an object?
      if (Object.keys(set).length > 0) {
        return Object.values(set)[0];
      }
    }
    return set.toString();
  }

  const skipPageCheck = (section: number, page: number) => {
    if (!questionSections[section]) {
      return false;
    }
    const conditions = [...questionSections[section].questions[page].getConditions()];
    if (conditions.length === 0) return false;

    return !conditions.some((condition) => {
      console.log(setToString(state.data[condition.question]), condition.answer);

      let res = setToString(state.data[condition.question]) === condition.answer;
      if (typeof condition.answer === "string") {
        res = setToString(state.data[condition.question]).includes(condition.answer);
      }
      if (condition.modifier === "not") {
        return !res;
      }
      return res;
    });
  }

  const handlePreviousQuestion = () => {
    let newPage = currentPage - 1;
    let newSection = currentSection;
    if (newPage < 0) {
      newSection = currentSection - 1;
      newPage = questionSections[newSection].questions.length - 1;
    }
    let skipPage = skipPageCheck(newSection, newPage);
    while (skipPage) {
      newPage -= 1;
      if (newPage < 0) {
        newSection = currentSection - 1;
        newPage = questionSections[newSection].questions.length - 1;
      }
      skipPage = skipPageCheck(newSection, newPage);
    }
    setCurrentSection(newSection);
    setCurrentPage(newPage)
  }

  const handleNextQuestion = () => {
    let newPage = currentPage + 1;
    let newSection = currentSection;
    // new section
    if (newPage >= questionSections[newSection].questions.length) {
      newSection += 1;
      newPage = 0;
    }

    let skipPage = skipPageCheck(newSection, newPage);
    while (skipPage) {
      newPage += 1;
      if (newPage >= questionSections[newSection].questions.length) {
        newSection += 1;
        newPage = 0;
      }
      skipPage = skipPageCheck(newSection, newPage);
    }
    setCurrentSection(newSection);
    setCurrentPage(newPage % questionSections[newSection].questions.length)
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
      question = (
        <DateQuestionSection question={currentQuestion as DateQuestion} />
      )
      break;

    case "waist-measurement":
      question = (
        <WaistQuestionSection question={currentQuestion as WaistMeasurementQuestion} />
      )
      break;
    case "likert-scale":
      question = (
        <LikertScaleSection question={currentQuestion as LikertScaleQuestion} />
      )
      break;
    case "section-intro":
      question = (
        <div className="content" style={{
          '--bulma-strong-color': 'black',
          lineHeight: 1
        } as any}>
          <SurveySectionIntro><Markdown>{currentQuestion.getQuestion()}</Markdown></SurveySectionIntro>
        </div>
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
          {
            currentQuestion.getType() === "section-intro" ? (
              <SurveyH1>{sectiontitle}</SurveyH1>
            ) : (
              <SurveyH1>{sectiontitle}: Question {currentQuestion.getQuestionNumber()}</SurveyH1>
            )
          }
          <AnswerColWrapper>
            {question}
          </AnswerColWrapper>
          
          <ProgressBar 
            label="Progress" 
            labelPosition="side"
            marginTop={"1rem"}
            marginBottom={"1rem"}
            value={100 * (currentQuestion.getQuestionNumber() / AllQuestions.length)} 
          />

          <ButtonGroup>
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
          </ButtonGroup>
        </SurveyWrapper>
      </SurveyPage>
    </Provider>
  )

}

export default SurveyQuestionnaire;