import React from "react"
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SurveyQuestionnaire from "./pages/SurveyQuestionnaire";
import { AnswerDataProvider } from "./reducers/AnswerDataProvider";
import DataCollection from "./pages/DataCollection";
import 'bulma/css/bulma.min.css';
import SummaryPage from "./pages/Summary/SummaryPage";
import SummaryPDF from "./pages/SummaryPDF";
import { defaultTheme as AdobeDefaultTheme, lightTheme, Provider } from "@adobe/react-spectrum";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy",
    element: <DataCollection />,
  },
  {
    path: "/survey",
    element: <SurveyQuestionnaire />,
  },
  {
    path: "/summary",
    element: <SummaryPage />,
  },
  {
    path: "/summary-pdf",
    element: <SummaryPDF />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

const defaultTheme = AdobeDefaultTheme;
console.log(defaultTheme);


function App() {
  return (
    <React.StrictMode>
      <Provider theme={defaultTheme} colorScheme="light" height={"100%"} width={"100%"}>
        <AnswerDataProvider>
          <RouterProvider router={router} />
        </AnswerDataProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App;
