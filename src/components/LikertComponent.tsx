import { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Radio } from '@mui/material';

const LikertComponent = (props: {
  setExternalData: (data: any) => void, 
  value: {
    options: string[],
    questions: string[]
  },
  defaultAnswers?: {[key: string]: string}
}) => {
  const { setExternalData, value } = props;
  const [likertData, setLikertData] = useState<{
    options: string[],
    questions: string[]
  }>({
    options: [],
    questions: []
  });

  const [answers, setAnswers] = useState<{[key: string]: string}>(props.defaultAnswers || {});

  useEffect(() => {
    try {
      if (value) {
        setLikertData(value);
      }
    } catch (error) {
      console.error("Likert Error:", error);
    }
  }, [value]);

  useEffect(() => {
    setAnswers(props.defaultAnswers || {});
  }, [props.defaultAnswers]);

  useEffect(() => {
    try {
      setExternalData(answers);
    } catch (error) {
      console.log("Likert External Data Error:", error);
    }
  }, [answers])


  return (
    <TableContainer component={Paper} style={{
      height: "100%",
    }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Likert Table Structure">
        <TableHead>
          <TableRow>
            <TableCell>{likertData.options.length > 0 ? "" : "No Options Available"}</TableCell>
            {likertData.options.map((option, i) => (
              <TableCell key={i} align="center" style={{
                fontWeight: '600',
                fontSize: '1.1rem'
              }}>
                {option}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {likertData.questions.length > 0 ? likertData.questions.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"
                style={{
                  fontSize: '1.1rem',
                  textAlign: 'left',
                }}
              >
                {row}
              </TableCell>
              {likertData.options.map((option, i) => (
                <TableCell key={i} align="center">
                  <Radio
                    checked={answers[row] === option}
                    onClick={() => {
                      setAnswers(curr => ({
                        ...curr,
                        [row]: option
                      }));
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={likertData.options.length + 1}>
                No Questions
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LikertComponent;