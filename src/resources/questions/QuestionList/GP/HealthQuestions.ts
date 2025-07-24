import { SectionIntroScreen, MultipleChoiceQuestion } from "../../QuestionTypes";
import { NumberQuestionV2 } from "../../QuestionTypes/NumberQuestion";

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
  new NumberQuestionV2(7, "What is your HDL cholesterol level?",
    ["mmol/L", "mg/dL"], true, {
    "mmol/L": {
      min: 0.3,       // Low extreme (~12 mg/dL)
      max: 3.0,       // High extreme (~116 mg/dL)
      defaultValue: 1.3, // Typical “desirable” (~50 mg/dL)
      step: 0.1
    },
    "mg/dL": {
      min: 20,        // Very low HDL
      max: 100,       // Upper range
      defaultValue: 50,
      step: 1
    }
  },
    true,
    undefined,
    true
  ),
  new NumberQuestionV2(8, "What is your LDL cholesterol level?",
    ["mmol/L", "mg/dL"], true, {
    "mmol/L": {
      min: 0.5,       // Low extreme (~19 mg/dL)
      max: 6.0,       // Severe hypercholesterolemia (~232 mg/dL)
      defaultValue: 2.6, // Typical treatment threshold (~100 mg/dL)
      step: 0.1
    },
    "mg/dL": {
      min: 20,        // Very low LDL
      max: 250,       // Upper extreme
      defaultValue: 100,
      step: 1
    }
  },
    true,
    undefined,
    true
  ),


  new MultipleChoiceQuestion(9, "Have you ever been told by your doctor that you have a condition called Left Ventricular Hypertrophy detected by ECG?", ["Yes", "No", "Don’t know"]),
  new MultipleChoiceQuestion(10, "Have you ever been told by a doctor that you have had kidney disease?", ["Yes", "No", "Don’t know"]),
  new MultipleChoiceQuestion(11, "Do you have trouble with your hearing?",
    [
      "Yes, use hearing aid",
      "Yes, but do not use hearing aid",
      "No",
      "Don’t know"
    ],
  ),
  new MultipleChoiceQuestion(12,
    "Have either of your parents, or any of your brothers or sisters been diagnosed with any of the following?",
    relativeHealthConditions, true, undefined, undefined),
];