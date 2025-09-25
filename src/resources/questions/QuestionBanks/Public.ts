import { PersonalInformationQuestions, HealthQuestions, SleepQuestions, FeelingsQuestions, PhysicalActivityQuestions, LeisureActivityQuestions, CompanionshipQuestions, FoodAndHabitsQuestions, EnvironmentalExposuresQuestions } from "../QuestionList/Public";
import { AlcoholAndSmokingQuestions } from "../QuestionList/Public/AlcoholAndSmokingQuestions";
import { BaseQuestionObject } from "../QuestionTypes";

export const PublicQuestionSections: {
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
      title: "Alcohol and Smoking Questions",
      questions: AlcoholAndSmokingQuestions
    },
    {
      title: "Environmental Exposures Questions",
      questions: EnvironmentalExposuresQuestions
    }
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
  ...AlcoholAndSmokingQuestions,
  ...EnvironmentalExposuresQuestions
]

export default PublicQuestionSections;