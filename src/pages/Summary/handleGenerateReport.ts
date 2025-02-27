import { generateReport } from "../../actions/generate";
import processSurveyResponse from "../../algorithm/calculateScores";

interface Props {
  state: any;
  setLoadingPDF: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleGenerateReport = async (props: Props) => {
  const { state, setLoadingPDF } = props;
  setLoadingPDF(true);
  const data = Object.entries(state.data)
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

  const calculationData = processSurveyResponse(data);

  const res = await generateReport(state.user, calculationData);
  console.log(res.data);
  if (res.data?.URL) {
    var newWindow = window.open(res.data.URL, '_blank');
    console.log("GENERATED PDF -->", res.data.URL);
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      //POPUP BLOCKED
      window.location.href = res.data.URL;
    }
  }
  setLoadingPDF(false);
}