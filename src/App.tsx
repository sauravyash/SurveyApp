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
    path: "/*",
    element: <Navigate to="/" />
  }
]);

const defaultTheme = AdobeDefaultTheme;
// console.log(defaultTheme);


function App() {

  return (
    <React.StrictMode>
      <Provider theme={defaultTheme} colorScheme="light" height={"100%"} width={"100%"} data-theme="light">
        <AnswerDataProvider>
          <RouterProvider router={router} />
        </AnswerDataProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App;
