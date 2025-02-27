import { SectionIntroScreen, NumberQuestion, MultipleChoiceQuestion } from "../../QuestionTypes";

const healthConditions = [
  "Diabetes",
  "High blood glucose (sugar) OR fasting glucose above 7mmol/L",
  "High blood pressure but taking medications for controlling blood pressure",
  "High blood pressure but not taking any medications",
  "High cholesterol levels in the past 2 years, or your cholesterol level is higher than 6.5mmol/L",
  "Head injury",
  "Stroke or TIA (transient ischemic attack)",
  "Cardiovascular disease",
  "Heart attack or myocardial infarction",
  "Atrial fibrillation",
  "Clinical depression",
  "None of the above"
];

const relativeHealthConditions = [
  "Diabetes (Type I)",
  "Diabetes (Type II)",
  "Stroke",
  "Dementia (below 60 years)",
  "Dementia (60 years and above)",
  "Cardiovascular disease or heart attack",
  "None of the above"
];

export const HealthQuestions = [
  new SectionIntroScreen(6.1,
    `The next few questions will be related to your health.`),
  new MultipleChoiceQuestion(6,
    "Have you ever been told by a doctor or other health professional that you have one of the following?",
    healthConditions, true, undefined, undefined),
  new NumberQuestion(7, "What is your HDL cholesterol level?", ["mmol/L", "mg/dl"], true, 0, 20, 1.5, true, undefined, true, 0.1),
  new NumberQuestion(8, "What is your LDL cholesterol level?", ["mmol/L", "mg/dl"], true, 0, 20, 3.5, true, undefined, true, 0.1),

  new MultipleChoiceQuestion(9, "Have you ever been told by your doctor that you have a condition called Left Ventricular Hypertrophy detected by ECG?", ["Yes", "No", "Don’t know"]),
  new MultipleChoiceQuestion(10, "Have you ever been told by a doctor that you have had kidney disease?", ["Yes", "No", "Don’t know"]),
  new MultipleChoiceQuestion(11, "Do you have trouble with your hearing?",
    [
      "Yes, I was prescribed hearing aids/implant and wear them",
      "Yes, I was prescribed hearing aids but do not wear them",
      "No",
      "Don’t know"
    ],
  ),
  new MultipleChoiceQuestion(12,
    "Have either of your parents, or any of your brothers or sisters been diagnosed with any of the following?",
    relativeHealthConditions, true, undefined, undefined),
];