import { SectionIntroScreen, NumberQuestion, MultipleChoiceQuestion } from "../QuestionTypes";
import { NumberQuestionV2 } from "../QuestionTypes/NumberQuestion";

export const HealthQuestions = [
    new SectionIntroScreen(17.1,
        `The next few questions will be related to your health.`),
    new NumberQuestion(17,
        "What is your total cholesterol level? (in last two years)",
        ["mmol/L"],
        true, 0, 20, 5.5, true, undefined, true, 0.1),
    new MultipleChoiceQuestion(18,
        "Have you been told by a doctor or a health professional that you have high cholesterol levels in the past 2 years, or your cholesterol level is higher than 6.5mmol/L?",
        ["Yes", "No", "Don’t know"]
    ),
    new NumberQuestion(19, "What is your HDL cholesterol level?", ["mmol/L"], true, 0, 20, 1.5, true, undefined, true, 0.1),
    new NumberQuestion(20, "What is your LDL cholesterol level?", ["mmol/L"], true, 0, 20, 3.5, true, undefined, true, 0.1),
    new NumberQuestionV2(21, "What are your triglyceride levels?",
        ["mmol/L", "mg/dL"],
        true, {
        "mmol/L": {
            min: 0.1,       // Avoid 0 as triglycerides cannot be zero
            max: 10,        // Upper bound for severe cases
            defaultValue: 1.5,
            step: 0.1
        },
        "mg/dL": {
            min: 10,        // Avoid 0; start from a reasonable minimum
            max: 900,       // Upper limit for extreme conditions
            defaultValue: 150,
            step: 1
        }
    }, true, undefined),
    new MultipleChoiceQuestion(22, "Have you ever been told by a doctor or other health professional that you have diabetes?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(23, "Have you been found to have high blood glucose (sugar) (for example, in a health examination, during an illness, during pregnancy) or fasting glucose above 7 mmol/L?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(24,
        "Have you ever had a head injury or blow to the head that caused you to be dazed, confused, disoriented, or be knocked out?",
        ["Yes, I lost consciousness (knocked out)", "Yes, I was dazed, confused, or disoriented but did not lose consciousness", "No", "Don’t know"],
        true,
    ),
    new MultipleChoiceQuestion(25,
        "For how long were you unconscious because of your head injury?",
        ["Less than 30mins", "Between 30mins to 24 hours", "More than 24 hours"],
        true,
        [{
            question: 24,
            answer: "Yes, I lost consciousness (knocked out)",
        }, {
            question: 24,
            answer: "Yes, I was dazed, confused, or disoriented but did not lose consciousness",
        }]
    ),
    new NumberQuestion(26, "What is your systolic BP?", ["mmHg"], true, 0, 300, 120, true, undefined, true, 1),
    new MultipleChoiceQuestion(27, "Has your doctor ever told you that you had high blood pressure?",
        ["Yes", "No", "Don’t know"]
    ),
    new NumberQuestion(28,
        "Could you please specify at what age were you first told that you had high blood pressure?",
        ["year"], false, 0, 130, 50, true,
        [{
            question: 27,
            answer: "Yes"
        }],
        true
    ),
    new MultipleChoiceQuestion(29, "Are you currently taking medications for controlling your high blood pressure?",
        ["Yes", "No"], true,
        [{
            question: 27,
            answer: "Yes"
        }]
    ),
    new NumberQuestion(30,
        "Could you please specify at what age you started taking medications for high blood pressure?",
        ["year"], false, 0, 130, 50, true,
        [{
            question: 29,
            answer: "Yes"
        }],
        true
    ),
    new MultipleChoiceQuestion(31, "Have you ever been told by a doctor that you had a stroke or TIA (transient ischemic attack)?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(32, "Have you ever been told by your doctor that you have a heart condition like atrial fibrillation/arrhythmias (irregular heartbeats) with/without stroke?", ["Atrial fibrillation with stroke", "Atrial fibrillation without stroke", "No atrial fibrillation", "Don’t know"]),
    new MultipleChoiceQuestion(33, "Have you ever been told by your doctor that you have a condition called Left Ventricular Hypertrophy detected by ECG?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(34, "Have you ever been told by your doctor that you had a cardiovascular disease?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(35, "Have you ever been told by your doctor that you had a heart attack or a myocardial infarction?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(36, "Have you been told by a doctor or health professional that you have hearing problems?",
        [
            "Yes, I was prescribed hearing aids/implant and wear them",
            "Yes, I was prescribed hearing aids but do not wear them",
            "No",
            "Don’t know"
        ],
    ),
    new MultipleChoiceQuestion(37, "Do you feel that your hearing is adequate for all purposes?",
        ["Yes", "Cannot hear speech in groups.", "Words are missed in coversation", "Hearing is a serious problem"],
        true,
        [{
            question: 36,
            answer: "No"
        },
        {
            question: 36,
            answer: "Don’t know"
        }]
    ),
    new MultipleChoiceQuestion(38, "Have you ever been told by a doctor that you have had kidney disease?", ["Yes", "No", "Don’t know"]),
];