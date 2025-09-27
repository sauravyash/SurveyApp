import React from 'react';
import { Box, Typography , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, ButtonGroup, Button } from '@mui/material';
import { Inputs, OutputResult, Scores } from '../../algorithm/types';
import { handleGenerateReport } from '../Summary/handleGenerateReport';
import { useAnswerData } from '../../reducers/AnswerDataProvider';
import Loading from '../../components/Loading';
import { downloadObjectAsJson } from '../../actions/downloadObjectAsJson';

interface ScoresProps {
  scores: Scores;
}

const ScoresTable: React.FC<ScoresProps> = ({ scores }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="scores-table">
        <TableHead>
          <TableRow>
            <TableCell className="bg-gray-200" style={{width: "50%"}}>Score Name</TableCell>
            <TableCell className="bg-gray-200">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(scores).map(([key, value]) => (
            <TableRow key={key.toString()}>
              <TableCell>{key.toString()}</TableCell>
              <TableCell>{value.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface InputsProps {
  inputs: Inputs;
}

const InputsTable: React.FC<InputsProps> = ({ inputs }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="inputs-table">
        <TableHead>
          <TableRow>
            <TableCell className="bg-gray-200" style={{width: "50%"}}>Input Name</TableCell>
            <TableCell className="bg-gray-200">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(inputs).map(([key, value]) => (
            <TableRow key={key.toString()}>
              <TableCell>{key.toString()}</TableCell>
              <TableCell>{value.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface OutputResultTableProps {
  data?: OutputResult;
}

const OutputResultTable: React.FC<OutputResultTableProps> = ({ data }) => {
  const {state} = useAnswerData();
  const [loadingPDF, setLoadingPDF] = React.useState(false);
  if (!data) {
    return (
      <Box className="output-result-table py-4">
        Error: Invalid Data
      </Box>
    );
  }

  const { scores, inputs } = data;

  return (
    <Box className="output-result-table py-4" style={{width: "100%", textAlign: "center"}}>
      {loadingPDF && <Loading />}
      <ButtonGroup variant="outlined" aria-label="Basic button group" className='py-5'>
        <Button onClick={() => handleGenerateReport({state, setLoadingPDF})}>Generate PDF</Button>
        <Button onClick={() => {
          downloadObjectAsJson({
            scores,
            inputs
          }, "survey-scores")
        }}>Download Scores</Button>
      </ButtonGroup>
      <Typography variant="h5">Output Results</Typography>
      <Typography variant="h6">Scores</Typography>
      <ScoresTable scores={scores} />

      <Box mt={2}>
        <Typography variant="h6">Inputs</Typography>
        <InputsTable inputs={inputs} />
      </Box>
    </Box>
  );
};

export default OutputResultTable;
