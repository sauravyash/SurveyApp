import { Button, Cell, Column, Flex, Row, TableBody, TableHeader, TableView } from "@adobe/react-spectrum";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import styled from "styled-components";
import { AllQuestions, LikertScaleQuestion, NumberQuestion } from "../../resources/questions/QuestionObject";
import { ButtonWrapper } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const SummaryWrapper = styled.section`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    padding: 2rem;
    text-align: center;
    position: relative;
    background: #fff;
    border-radius: 1em;
    width: 100%;
    margin: auto;
    height: 100vh;
    overflow: auto;
`;

type QuestionList = {
  [key: string]: string;
}

const parseAnswerData: (arr: [string, any]) => string = (arr) => {
  if (!arr[1] || arr[1] === "") {
    return "No answer provided";
  }

  if (arr[1] === "unsure") return "Unsure";

  if (typeof arr[1] === "object") {
    console.log(arr[1]);
    
    if (arr[1].currentKey) {
      let val = arr[1].currentKey;
      if (val && val.includes(arr[0] + ": ")) {
        val = val.split(arr[0] + ": ")[1];
      }
      return val;
    }
    const [unit, amount] = Object.entries(arr[1])[0];
    const questionData = AllQuestions.find(q => q.getQuestionNumber() === Number(arr[0])) as NumberQuestion;
    return `${amount} ${unit}${amount !== 1 && !questionData.getAttributes().scientific_unit ? 's' : ''}`;
  }
  return arr[1].toString();
}

const SummaryPage = () => {
  const { state } = useAnswerData();
  const navigate = useNavigate();

  const questionList: QuestionList = AllQuestions.reduce((obj, question) => {
    if (question.getType() === "likert-scale") {
      (question as LikertScaleQuestion).getQuestionList().forEach((q, i) => {
        obj[(question.getQuestionNumber() + i)] = q;
      });
      return obj;
    }
    obj[question.getQuestionNumber()] = question.getQuestion();
    return obj;
  }, {} as QuestionList);

  const tableItems = Object.entries(state.data).map(arr => ({
    question_number: Number(arr[0]),
    question: questionList[arr[0]],
    answer: parseAnswerData(arr),
  }));
  console.log(tableItems);
  

  const handleResetSurvey = () => {
    if (window.confirm("Are you sure you want to reset the survey?")) {
      localStorage.removeItem('answerData');
      navigate("/");
    }
  }

  console.log(tableItems);
  

  const handlePrintPDF = () => {
    print();
  }

  return (
    <SummaryWrapper>
        <Flex
          direction="column"
          gap="size-100"
          width="100%"
          margin={"size-100"}
          alignItems={"center"}
        >
          <h1
            className={[
              "is-size-1",
            ].join(" ")}
            style={{ padding: "0.5em 0 0" }}
          >Summary</h1>
          <TableView
            aria-label="Summary Table of answers"
            width={'95%'}
          >
            <TableHeader columns={[
              {
                name: '#',
                uid: 'question_number',
                width: 10
              },
              {
                name: 'Question',
                uid: 'question'
              }, {
                name: 'Answer',
                uid: 'answer'
              }
            ]}>
              {column => (
                <Column
                  key={column.uid}
                  align={column.uid === 'date' ? 'end' : 'start'}
                  width={column.width || null}
                >
                  {column.name}
                </Column>
              )}
            </TableHeader>
            <TableBody
              items={tableItems}
            >
              {(item: any) => {
                return (
                  <Row key={JSON.stringify(item)}>
                    {columnKey => <Cell>{item[columnKey]}</Cell>}
                  </Row>
                )
              }}
            </TableBody>
          </TableView>
          <ButtonWrapper>
            <Button
              variant="accent"
              onPress={handleResetSurvey}
            >
              Reset The Survey
            </Button>
            <Button
              variant="accent"
              onPress={handlePrintPDF}
            >
              Print PDF
            </Button>
          </ButtonWrapper>
        </Flex>
    </SummaryWrapper>

  )
}

export default SummaryPage;