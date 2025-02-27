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
import { defaultTheme as AdobeDefaultTheme, Provider } from "@adobe/react-spectrum";
import PatientParticipationStatement from "./pages/PatientParticipationStatement/PatientParticipationStatement";
import { ErrorBoundary } from "./pages/ErrorBoundary";
import { I18nProvider } from 'react-aria';
import Accessibility from "./components/Accessibility";
import SurveyTester from "./pages/SurveyTester";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/privacy",
    element: <DataCollection />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/survey",
    element: <SurveyQuestionnaire />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/summary",
    element: <SummaryPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/patient-information",
    element: <PatientParticipationStatement />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/survey/tester",
    element: <SurveyTester />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/*",
    element: <Navigate to="/" />
  }
]);

const defaultTheme = AdobeDefaultTheme;


function App() {

  return (
    <React.StrictMode>
      <Provider theme={defaultTheme} colorScheme="light" height={"100%"} width={"100%"} data-theme="light">
        <AnswerDataProvider>
          <I18nProvider locale="en-AU">
            <Accessibility />
            <RouterProvider router={router} />
          </I18nProvider>
        </AnswerDataProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App;
