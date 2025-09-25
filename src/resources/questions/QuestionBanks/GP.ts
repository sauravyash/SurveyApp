import { PersonalInformationQuestions, HealthQuestions, SleepQuestions, FeelingsQuestions, PhysicalActivityQuestions, LeisureActivityQuestions, CompanionshipQuestions, FoodAndHabitsQuestions } from "../QuestionList/GP";
import { AlcoholAndSmokingQuestions } from "../QuestionList/GP/AlcoholAndSmokingQuestions";
import { BaseQuestionObject } from "../QuestionTypes";

export const GPQuestionSections: {
  title: string,
  questions: BaseQuestionObject[]
}[] = [
    {
      title: "Personal Information",
      questions: PersonalInformationQuestions
    },
    {
      title: "Health Questions",
      questions: HealthQuestions
    },
    {
      title: "Sleep Questions",
      questions: SleepQuestions
    },
    {
      title: "Feelings Questions",
      questions: FeelingsQuestions
    },
    {
      title: "Physical Activity Questions",
      questions: PhysicalActivityQuestions
    },
    {
      title: "Leisure Activity Questions",
      questions: LeisureActivityQuestions
    },
    {
      title: "Companionship Questions",
      questions: CompanionshipQuestions
    },
    {
      title: "Food and Habits Questions",
      questions: FoodAndHabitsQuestions
    },
    {
      title: "Alcohol And Smoking Questions",
      questions: AlcoholAndSmokingQuestions
    },
    
  ]

export const AllQuestions: BaseQuestionObject[] = [
  ...PersonalInformationQuestions,
  ...HealthQuestions,
  ...SleepQuestions,
  ...FeelingsQuestions,
  ...PhysicalActivityQuestions,
  ...LeisureActivityQuestions,
  ...CompanionshipQuestions,
  ...FoodAndHabitsQuestions,
  ...AlcoholAndSmokingQuestions
]

export default GPQuestionSections;