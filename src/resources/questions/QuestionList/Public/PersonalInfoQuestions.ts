import { DateQuestion, MultipleChoiceQuestion, NumberQuestion, SectionIntroScreen, WaistMeasurementQuestion } from "../../QuestionTypes";
import { NumberQuestionV2 } from "../../QuestionTypes/NumberQuestion";

const asia_category_name = "Asia (including the Indian sub-continent), Middle East, North Africa, Southern Europe";

export const PersonalInformationQuestions = [
    new SectionIntroScreen(1.1,
        `In this section, we will ask you for some general information about yourself.`),
    new NumberQuestion(1, "What is your age?", ["year"], false, 18, 130, 50),
    new DateQuestion(2, "What is your date of birth?"),
    new MultipleChoiceQuestion(3, "What is your gender?", ["Male", "Female", "Non-Binary", "Other identity", "Prefer not to say"], true),
    new MultipleChoiceQuestion(4, "Where were you born?", ["Australia", asia_category_name, "Other"], true),
    new MultipleChoiceQuestion(5, "Are you of Aboriginal, Torres Strait Islander origin, Pacific Islander or Māori descendent?", ["No", "Yes, Aboriginal", "Yes, Torres Strait Islander", "Both Aboriginal and Torres Strait Islander", "Pacific Islander or Māori descendent", "Other", "Prefer not to say"], true),
    new MultipleChoiceQuestion(6, "Do you speak a language other than English at home?", ["No, English only", "Yes, Mandarin", "Yes, Italian", "Yes, Arabic", "Yes, Cantonese", "Yes, Greek", "Yes, Vietnamese", "Yes, other"]),
    new NumberQuestion(7, "How many languages are you fluent in?", ["language(s)"], true, 1, 10, 1, true),
    new MultipleChoiceQuestion(8, "What was the highest qualification that you completed?",
        [
            "Partially completed primary/elementary school (or equivalent)", 
            "Completed primary/elementary school (or equivalent)", 
            "School certificate (Year 10) (or equivalent)", 
            "Higher school certificate (Year 12) (or equivalent)", 
            "Trade certificate/apprenticeship", 
            "Technician’s certificate/advanced certificate", 
            "Certificate other than above", 
            "Associate diploma", 
            "Undergraduate diploma", 
            "Bachelor’s degree", 
            "Post graduate diploma/certificate", 
            "Higher degree"

        ], true),
    new MultipleChoiceQuestion(9, "Are you currently in a relationship with someone?", ["Yes, living with the person you are married to", "Yes, living with a partner (but not married to them)", "Yes, in a relationship with someone but not living with them", "Yes, married or have a partner but NOT living together as one is in a hostel/nursing home/hospital or for other reasons", "No, not in a relationship with anyone"]),
    new NumberQuestionV2(10, "Enter your height in either cm or feet/inches",
        ["cm", "feet / inches"],
        true,
        {
            "cm": {min: 100, max: 300, step: 1},
            "feet": {min: 3, max: 8, step: 1},
            "inches": {min: 0, max: 11, step: 1}
        },
    ),
    new NumberQuestionV2(
        11,
        "Enter your weight in kgs or stones/pounds",
        ["kg", "stone / pounds", "lb"],
        true,
        {
            "kg": {min: 40, max: 300, step: 1},
            "stone / pounds": {min: 0, max: 50, step: 1},
            "stone": {min: 2, max: 50, step: 1},
            "pounds": {min: 0, max: 13, step: 1},
            "lb": {min: 60, max: 700, step: 1}
        },
    ),
    new WaistMeasurementQuestion(12, "Your waist measurement taken below the ribs (usually at the level of the navel, and while standing)", [
        {
            conditions: [
                // asian
                {
                    question: 4,
                    answer: asia_category_name
                },
                // aboriginal
                {
                    question: 5,
                    answer: "No",
                    modifier: "not"
                },
            ],
            male: ["Less than 90 cm", "90 – 100 cm", "More than 100 cm"],
            female: ["Less than 80 cm", "80 – 90 cm", "More than 90 cm"]
        },
        {
            conditions: "default",
            male: ["Less than 102 cm", "102 – 110 cm", "More than 110 cm"],
            female: ["Less than 88 cm", "88 – 100 cm", "More than 100 cm"]
        }
    ]),
    new MultipleChoiceQuestion(13, "Have either of your parents, or any of your brothers or sisters been diagnosed with diabetes (Type 1 or Type 2)?", ["Yes (Type 1)", "Yes (Type 2)", "No", "Don’t know"]),
    new MultipleChoiceQuestion(14, 
        "Have either of your parents, or any of your brothers or sisters been diagnosed with stroke?", 
        ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(15, "Have either of your parents, or any of your brothers or sisters been diagnosed with dementia or cognitive impairment?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(16, "Have either of your parents, or any of your brothers or sisters been diagnosed with premature cardiovascular disease or myocardial infarction?", ["Yes", "No", "Don’t know"]),
];