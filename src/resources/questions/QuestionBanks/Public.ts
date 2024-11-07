import { PersonalInformationQuestions, HealthQuestions, SleepQuestions, FeelingsQuestions, PhysicalActivityQuestions, LeisureActivityQuestions, CompanionshipQuestions, FoodAndHabitsQuestions, EnvironmentalExposuresQuestions } from "../QuestionList";
import { BaseQuestionObject } from "../QuestionTypes";

export const QuestionSections: {
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
  ...EnvironmentalExposuresQuestions
]

export default QuestionSections;