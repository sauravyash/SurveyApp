import { Button, Flex, ProgressBar } from "@adobe/react-spectrum";
import { useAnswerData } from "../../reducers/AnswerDataProvider";
import styled from "styled-components";
import { ButtonWrapper } from "../../components/Button";
import { useState } from "react";
import { Box } from "@mui/material";
import { handleGenerateReport } from "./handleGenerateReport";
import SummaryTable from "./SummaryTable";
import { cleanSurveyData } from "./cleanSurveyData";

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


const SummaryPage = () => {
  const { state } = useAnswerData();
  const [loadingPDF, setLoadingPDF] = useState(false);

  const ActionButtons = (
    <ButtonWrapper>
      <Button
        variant="accent"
        onPress={() => handleGenerateReport({state, setLoadingPDF})}
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
        <SummaryTable tableItems={cleanSurveyData(state.data)} />
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