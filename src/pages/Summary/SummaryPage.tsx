import { Button, Cell, Column, Flex, Row, TableBody, TableHeader, TableView } from "@adobe/react-spectrum";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import styled from "styled-components";
import QuestionSections from "../../resources/questions/QuestionObject";
import { ButtonWrapper } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const SummaryWrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    text-align: center;
    justify-content: center;
    align-items: center;
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

const SummaryPage = () => {
  const { state } = useAnswerData();
  const navigate = useNavigate();

  const questionList: QuestionList = QuestionSections.map(section => section.questions).flat().reduce((acc: QuestionList, question) => {
    acc[question.getQuestionNumber()] = question.getQuestion();
    return acc;
  }, {});

  const tableItems = Object.entries(state.data).map(arr => ({
    question_number: Number(arr[0]),
    question: questionList[arr[0]],
    answer: JSON.stringify(arr[1])
  }));

  const handleResetSurvey = () => {
    if (window.confirm("Are you sure you want to reset the survey?")) {
      localStorage.removeItem('answerData');
      navigate("/")
    }
  }

  const handlePrintPDF = () => { }

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