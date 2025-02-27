import React, { useEffect } from 'react';
import questionSections, { AllQuestions, questionList } from "../../resources/questions/QuestionBanks";
import { Button, ButtonGroup, Container, Grid, Tab, Tabs } from '@mui/material';
import LazyQuestion from './LazyQuestion';
import { cleanAnswerData, useAnswerData } from '../../reducers/AnswerDataProvider';
import processSurveyResponse from '../../algorithm/calculateScores';
import { OutputResult } from '../../algorithm/types';
import OutputResultTable from './OutputTable';
import { downloadObjectAsJson } from '../../actions/downloadObjectAsJson';
import SummaryTable from '../Summary/SummaryTable';
import { cleanSurveyData } from '../Summary/cleanSurveyData';
import IncompleteError from './IncompleteError';
import { loadJsonFile } from './loadJsonFile';

const tabbedSectionStyle = {
  width: "-webkit-fill-available",
}

const objectifySurveyData = (data: any) => {
  return Object.entries(data)
    .reduce((obj, item: [string, any]) => {
      try {
        if (typeof item[1] === "string" && item[1].startsWith(item[0] + ": ")) {
          item[1] = item[1].split(item[0] + ": ")[1];
        }
        obj[item[0]] = item[1];
        return obj;
      } catch (error) {
        console.error(error);
        return obj;
      }
    }, {} as { [key: string]: any });
}

const SurveyTester: React.FC = () => {
  const { state, dispatch } = useAnswerData();
  const [sectionList, setSectionList] = React.useState<Extract<typeof questionSections, {}>>();
  const [calculatedData, setCalculatedData] = React.useState<OutputResult>();
  const [tabPage, setTabPage] = React.useState<number>(0);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabPage(newValue);
  };

  useEffect(() => {
    setSectionList(questionSections);

    if (state.data["3"]) {
      handleProcessing();
    }

  }, [state]);

  const handleProcessing = () => {
    try {
      const data = objectifySurveyData(state.data);
      const numQuestions = Object.entries(AllQuestions).filter(([_, question]) => question.getType() !== "section-intro").length;
      if (Object.entries(data).length < numQuestions) {
        throw new IncompleteError(`Question list is not complete. \nQuestions answered: ${Object.entries(data).length} \nQuestions Existing: ${Object.entries(questionList).length - 5}`);
      }

      const calculationData = processSurveyResponse(data);
      setCalculatedData(calculationData);
    } catch (error) {
      if (error instanceof IncompleteError) {
        console.info(error.message);
      } else {
        console.error(error);
      }
    }
  }

  const handleUploadAnswers = async () => {
    await loadJsonFile((data) => {
      const newData = { ...state, data: data };
      
      dispatch({ type: 'set_data', payload: newData });
    });
  };

  const handleDownloadAnswers = () => {
    try {
      if (state.data === undefined || Object.entries(state.data).length < 2) {
        alert("No data to download.");
        return;
      }
      const dataClone = { ...state.data };
      cleanAnswerData(dataClone);
      console.log("dl", dataClone);
      downloadObjectAsJson(dataClone, 'survey-answers');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteAnswers = () => {
    dispatch({ type: 'remove_session_data' });
  }

  return (
    <Container className='is-flex is-flex-direction-column is-align-items-center'>
      <h1 className='title is-1 has-text-centered pt-6'>Survey Tester</h1>
      <p className='subtitle pt-4 has-text-centered'>This is the page for testing the survey application.</p>
      <ButtonGroup variant="outlined" aria-label="Basic button group" className='py-5'>
        <Button onClick={handleDeleteAnswers}>Delete Answers</Button>
        <Button onClick={handleUploadAnswers}>Upload</Button>
        <Button onClick={handleDownloadAnswers}>Download Answers</Button>
        <Button onClick={() => { document.getElementById('survey-tester-feedback')?.scrollIntoView() }}>Jump To Feedback</Button>
      </ButtonGroup>
      <Tabs
        value={tabPage}
        onChange={handleChange}
        aria-label="Tabs"
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}
        className='my-5'
      >
        <Tab label="All Questions" />
        <Tab label="Answer Table" />
      </Tabs>
      <div hidden={tabPage !== 0} style={tabbedSectionStyle}>
        <h2 className='title is-2 pt-6' id="survey-tester-questions">Questions</h2>
        {sectionList && sectionList.length > 0 && (
          sectionList.map((section, index) => (
            <Grid container key={index} direction={"column"} gap={4}>
              <Grid xs={12} item>
                <h2 className='title is-3'>{section.title}</h2>
              </Grid>
              {section.questions.map((question, i) => (
                <LazyQuestion key={i} question={question} />
              ))}
            </Grid>
          ))
        )}
      </div>
      <div style={{
        ...tabbedSectionStyle,
        display: tabPage === 1 ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
      }}>
        <SummaryTable tableItems={cleanSurveyData(state.data)} />
      </div>

      <h2 className='title is-2 pt-6 pb-4' id="survey-tester-feedback">Feedback Statistics</h2>
      <p className='subtitle'>This section will be used to display feedback statistics.</p>

      <OutputResultTable data={calculatedData} />

    </Container>
  );
};

export default SurveyTester;
