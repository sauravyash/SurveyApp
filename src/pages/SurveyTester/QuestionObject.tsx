import { Grid, Paper } from "@mui/material";
import AnswerModule from "./questionTypes";
import { BaseQuestionObject } from "../../resources/questions/QuestionTypes";

const QuestionObject = (props: { question: BaseQuestionObject }) => {
  const { question } = props;
  return (
    <Grid 
      item 
      xs={12} 
      component={Paper} 
      padding={2} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 1, 
        alignItems: 'center' ,
        minHeight: '400px'
      }}
    >
      <h3>{question.getQuestionNumber()}</h3>
      {/* <p>{question.getQuestion()}</p> */}
      <AnswerModule question={question} />
    </Grid>
  );
}

export default QuestionObject;
