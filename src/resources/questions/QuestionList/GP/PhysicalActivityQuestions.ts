import { SectionIntroScreen } from "../../QuestionTypes";
import { NumberQuestionV2 } from "../../QuestionTypes/NumberQuestion";

const hourMinsBounds = {
    hours: {
        min: 0,
        max: 23,
        defaultValue: 0,
        step: 1
    },
    minutes: {
        min: 0,
        max: 59,
        defaultValue: 0,
        step: 1
    }
};

export const PhysicalActivityQuestions = [
    new SectionIntroScreen(30.1,
        `These following questions will ask you about the time you spent being physically active in the **last 7 days.** Please answer each question even if you do not consider yourself to be an active person. Please think about the activities you do at work, as a part of your house and yard work, to get from place to place, and in your spare time for recreation, exercise or sport.`),
    new NumberQuestionV2(30,
        "During the last 7 days, on how many days did you do vigorous physical activities like heavy lifting, digging, aerobics, or fast bicycling?",
        ["days per week"],
        false,
        {
            "days per week": {
                min: 0,
                max: 7,
                step: 1,
                defaultValue: 0
            }
        }, true, undefined, false,
        `Think about all the vigorous activities that you did in the last 7 days. Vigorous physical activities refer to activities that take hard physical effort and make you breathe much harder than normal. Think *only* about those activities that you did for at least 10 minutes at a time.`),
    new NumberQuestionV2(31,
        "How much time did you usually spend doing vigorous physical activities on one of those days?",
        ["hours / minutes"], true, hourMinsBounds, true,
        [{
            question: 30,
            answer: 0,
            modifier: "not"
        }], true),
    new NumberQuestionV2(32,
        "During the last 7 days, on how many days did you do moderate physical activities like carrying light loads, bicycling at a regular pace, or doubles tennis? Do not include walking.",
        ["days per week"],
        false,
        {
            "days per week": {
                min: 0,
                max: 7,
                step: 1,
                defaultValue: 0
            }
        }, true, undefined, false,
        "Think about all the moderate activities that you did in the last 7 days. Moderate activities refer to activities that take moderate physical effort and make you breathe somewhat harder than normal. Think *only* about those physical activities that you did for at least 10 minutes at a time."
    ),
    new NumberQuestionV2(33, "How much time did you usually spend doing moderate physical activities on one of those days?",
        ["hours / minutes"], true, hourMinsBounds, true,
        [
            {
                question: 32,
                answer: 0,
                modifier: "not"
            },
        ], true),
    new NumberQuestionV2(34, "During the last 7 days, on how many days did you walk for at least 10 minutes at a time?",
        ["days per week"], true,
        {
            "days per week": {
                min: 0,
                max: 7,
                step: 1
            }
        }, true, undefined, false, " Think about the time you spent walking in the last 7 days. This includes at work and at home, walking to travel from place to place, and any other walking that you have done solely for recreation, sport, exercise, or leisure."),
    new NumberQuestionV2(35, "How much time did you usually spend walking on one of those days?",
        ["hours / minutes"], true, hourMinsBounds, true,
        [
            {
                question: 34,
                answer: 0,
                modifier: "not"
            }
        ], true),
];

(PhysicalActivityQuestions[1] as NumberQuestionV2).setDisplayNoneCheckbox(true);
(PhysicalActivityQuestions[3] as NumberQuestionV2).setDisplayNoneCheckbox(true);
(PhysicalActivityQuestions[5] as NumberQuestionV2).setDisplayNoneCheckbox(true);

(PhysicalActivityQuestions.find(q => q.getQuestionNumber() === 30) as NumberQuestionV2).setContextOptions({
    location: "above",
    textSize: "1.25rem"
});

(PhysicalActivityQuestions.find(q => q.getQuestionNumber() === 32) as NumberQuestionV2).setContextOptions({
    location: "above",
    textSize: "1.25rem"
});

(PhysicalActivityQuestions.find(q => q.getQuestionNumber() === 34) as NumberQuestionV2).setContextOptions({
    location: "above",
    textSize: "1.25rem"
});