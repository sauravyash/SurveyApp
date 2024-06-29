import { Page, Text, View, Document, StyleSheet, PDFViewer, renderToStream } from '@react-pdf/renderer';

import { useAnswerData } from "../../reducers/AnswerDataProvider";
import QuestionSections from "../../resources/questions/QuestionObject";

type QuestionList = {
  [key: string]: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const SummaryDocument = () => {
  return (
    <Document>
      <Page size="A4" orientation='portrait' style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )
}

const SummaryPDFPage = () => {
  const { state } = useAnswerData();

  const questionList: QuestionList = QuestionSections.map(section => section.questions).flat().reduce((acc: QuestionList, question) => {
    acc[question.getQuestionNumber()] = question.getQuestion();
    return acc;
  }, {});

  const tableItems = Object.entries(state.data).map(arr => ({
    question_number: arr[0],
    question: questionList[arr[0]],
    answer: arr[1]
  }));

  const handleDownload = async () => {
    // Convert Node.js ReadableStream to browser-compatible ReadableStream
    const nodeStream = await renderToStream(<SummaryDocument />);
    const readableStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', chunk => controller.enqueue(chunk));
        nodeStream.on('end', () => controller.close());
        nodeStream.on('error', err => controller.error(err));
      }
    });

    // Convert ReadableStream to a Blob
    const response = new Response(readableStream);
    const blob = await response.blob();

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.pdf';

    // Append link to body
    document.body.appendChild(link);

    // Trigger click event
    link.click();

    // Remove link from body
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <PDFViewer>
        <SummaryDocument />
      </PDFViewer>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  )
}

export default SummaryPDFPage;