import { Button, Cell, Column, Flex, ProgressBar, Row, TableBody, TableHeader, TableView } from "@adobe/react-spectrum";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import styled from "styled-components";
import { ButtonWrapper } from "../../components/Button";
import processSurveyResponse from "../../algorithm/calculateScores";
import { generateReport } from "../../actions/generate";
import { useState } from "react";
import { Box } from "@mui/material";
import { AllQuestions } from "../../resources/questions/QuestionBanks/Public";
import { NumberQuestion, LikertScaleQuestion } from "../../resources/questions/QuestionTypes";

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
    width: 80%;
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

  if (typeof arr[1] === "string") {
    let val = arr[1];
    if (val.includes(": ")) {
      val = val.split(": ")[1];
    }
    if (val.startsWith("Other::")) {
      val = val.split("::")[1];
    }
    return val;
  }

  if (typeof arr[1] === "object") {
    if (arr[1].currentKey) {
      let val = arr[1].currentKey;
      if (val && val.includes(arr[0] + ": ")) {
        val = val.split(arr[0] + ": ")[1];
      }
      return val;
    }
    const a = Object.entries(arr[1]);
    if (a.length === 0) {
      return "No answer provided";
    }
    const [unit, amount] = a[0];
    const questionData = AllQuestions.find(q => q.getQuestionNumber() === Number(arr[0]));

    if (questionData && questionData.getType() === "number") {
      return `${amount} ${unit}${amount !== 1 && !(questionData as NumberQuestion).getAttributes().scientific_unit ? 's' : ''}`;
    }
    return `${amount} ${unit}`;
  }
  return arr[1].toString();
}

const SummaryPage = () => {
  const { state } = useAnswerData();
  const [loadingPDF, setLoadingPDF] = useState(false);

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

  const handleGenerateReport = async () => {
    setLoadingPDF(true);
    const data = Object.entries(state.data)
      .reduce((obj, item: [string, any]) => {
        if (typeof item[1] === "string" && item[1].startsWith(item[0] + ": ")) {
          item[1] = item[1].split(item[0] + ": ")[1];
        }
        obj[item[0]] = item[1];
        return obj;
      }, {} as { [key: string]: any });

    const calculationData = processSurveyResponse(data);

    const res = await generateReport(state.user, calculationData);
    console.log(res.data);
    if (res.data?.URL) {
      var newWindow = window.open(res.data.URL, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        //POPUP BLOCKED
        window.location.href = res.data.URL;
      }
    }
    setLoadingPDF(false);
  }

  const ActionButtons = (
    <ButtonWrapper>
      <Button
        variant="accent"
        onPress={handleGenerateReport}
      >
        Generate Report
      </Button>
    </ButtonWrapper>
  );

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
        {ActionButtons}
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
        {ActionButtons}
      </Flex>
      <div className={`modal ${loadingPDF ? 'is-active' : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box sx={{
              padding: '1em',
              background: 'rgba(255, 255, 255, 1)',
              width: '400px',
              borderRadius: '0.25em'
            }}>
              <ProgressBar label="Loading…" isIndeterminate />
              <span style={{
                paddingTop: '2em',
                display: 'block',
              }}>Please wait as we create your personalised PDF document.</span>
            </Box>
          </Box>
        </div>
      </div>
    </SummaryWrapper>
  )
}

export default SummaryPage;