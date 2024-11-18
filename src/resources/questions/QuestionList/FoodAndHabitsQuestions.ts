import { SectionIntroScreen, MultipleChoiceQuestion } from "../QuestionTypes";
import { NumberQuestionV2 } from "../QuestionTypes/NumberQuestion";

export const FoodAndHabitsQuestions = [
  new SectionIntroScreen(80.1,
      `In this section, we will ask you questions regarding your diet and habits.`),
  new MultipleChoiceQuestion(80, "How often do you eat vegetables?", ["Every day", "Not every day"], true),
  new MultipleChoiceQuestion(81, "How many serves of vegetables do you usually eat each day?",
      ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat vegetables"], true, [
      { question: 80, answer: "Every day" }
  ], "A standard serve is approximately half a cup of cooked vegetables or 1 cup of leafy greens or raw salad"),
  new MultipleChoiceQuestion(82, "How often do you eat fruits?", ["Every day", "Not every day"], true),
  new MultipleChoiceQuestion(83, "How many serves of fruits do you usually eat each day?",
      ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat fruits"], true, [
      { question: 82, answer: "Every day" }
  ], "A standard serve is approximately 1 medium piece of fruit or 2 small pieces of fruit or 1 cup of diced fruit or ½ cup of fruit juice"),
  new NumberQuestionV2(84, "How often do you drink fruit juices such as orange, grapefruit or tomato?",
      ["per day", "per week", "per month"], false, {
        "per day": {
            min: 0,
            max: 10,
            step: 0.5
        },
        "per week": {
            min: 0,
            max: 50,
            step: 1
        },
        "per month": {
            min: 0,
            max: 100,
            step: 1
        }
      }, true, undefined),
  new NumberQuestionV2(85, "How often do you eat chips, French fries, wedges, fried potatoes or crisps?",
      ["per day", "per week", "per month"], false, {
        "per day": {
            min: 0,
            max: 10,
            step: 0.5
        },
        "per week": {
            min: 0,
            max: 50,
            step: 1
        },
        "per month": {
            min: 0,
            max: 100,
            step: 1
        }
      }, true, undefined),
  new NumberQuestionV2(86, "How often do you eat potatoes?",
      ["per day", "per week", "per month"], false, {
        "per day": {
            min: 0,
            max: 10,
            step: 0.5
        },
        "per week": {
            min: 0,
            max: 50,
            step: 1
        },
        "per month": {
            min: 0,
            max: 100,
            step: 1
        }
      }, true, undefined, false, 
      "A standard serve is ½ a medium potato or other starchy vegetable (sweet potato, taro or cassava)"),
  new NumberQuestionV2(87, "How often do you eat salad?",
      ["per day", "per week", "per month"], false, {
        "per day": {
            min: 0,
            max: 10,
            step: 0.5
        },
        "per week": {
            min: 0,
            max: 50,
            step: 1
        },
        "per month": {
            min: 0,
            max: 100,
            step: 1
        }
      }, true, undefined, false, "A standard serve of salad is 1 cup."),
  new MultipleChoiceQuestion(88, "How often do you eat green leafy vegetables (e.g. spinach, lettuce, kale)?",
      ["Less than 2 servings per week", "2-5 servings per week", "6 or more servings per week"], true),
  new MultipleChoiceQuestion(89, "How often do you eat other vegetables (e.g. pumpkin, okra, mushroom, eggplant)?",
      ["Less than 5 servings per week", "5-6 servings per week", "7 or more servings per week"], true, undefined, "A standard serve is ½ a cup"),
  new MultipleChoiceQuestion(90, "How often do you eat berries (e.g. blueberries, strawberries)?",
      ["Less than 1 serving per week", "Less than 2 serving per week", "More than 2 servings per week"], true, undefined, "1 serve is 150g or approx. 1 cup"),
  new MultipleChoiceQuestion(91, "How often do you eat nuts?",
      ["Less than 1 serving per month", "Less than 5 serving per week", "More than 5 servings per week"], true, undefined, "A standard serve is 30g (approx. 20 almonds, 10 Brazil nuts or 15 cashews)"),
  new MultipleChoiceQuestion(92, "What is the primary cooking oil that you use?",
      ["Olive oil", "Vegetable oil", "Coconut oil", "Other"], true),
  new MultipleChoiceQuestion(93, "How much butter or margarine do you use?",
      ["Less than 1 tablespoon per day", "1 to 2 tablespoon per day", "More than 2 tablespoons per day"], true),
  new MultipleChoiceQuestion(94, "How many servings of cheese do you eat per week?",
      ["Less than 1 serving per week", "1 to 6 servings per week", "7 or more servings per week"], true, undefined, "For example, 2 slices of hard cheese or ½ cup of ricotta cheese is one serve"),
  new MultipleChoiceQuestion(95, "How many servings of whole grains (e.g. brown rice, multigrain bread, wholegrain pasta, barely, quinoa etc.) do you eat per week?",
      ["Less than 1 serving per day", "1 to 2 servings per day", "3 or more servings per day"], true, undefined, "For example, 1 slice of bread, approx. ½ cup of cooked rice/quinoa or pasta is one serve"),
  new MultipleChoiceQuestion(96, "How often do you eat a serving of fish or seafood that is not deep-fried?",
      ["Rarely", "1-3 times per month", "Once a week", "2-3 times per week", "4 or more times per week"], true, undefined, "For example, a 100g fish fillet or one small can of fish is one serve."),
  new MultipleChoiceQuestion(97, "How often do you eat beans?",
      ["Less than 1 meal per week", "1 to 3 meals per week", "More than 3 meals per week"], true),
  new MultipleChoiceQuestion(98, "How often do you eat poultry (not deep fried)?",
      ["Less than 1 meal per week", "Less than 2 meals per week", "More than 2 meals per week"], true),
  new MultipleChoiceQuestion(99, "How often do you eat red meat and meat products?",
      ["Less than 4 meals per week", "4 to 6 meals per week", "More than 6 meals per week"], true),
  new MultipleChoiceQuestion(100, "How often do you eat fast fried foods?",
      ["Less than once per week", "1 to 3 meals per week", "4 or more meals per week"], true),
  new MultipleChoiceQuestion(101, "How many servings of pastries or sweets do you eat per week?",
      ["Less than 5 servings per week", "5 to 6 servings per week", "7 or more servings per week"], true),
  new MultipleChoiceQuestion(102, "How many glasses of wine (red or white) do you drink?",
      ["I never drink wine", "Less than 1 glass per day", "One glass per day", "More than one glass per day"], true),
  new NumberQuestionV2(103, "Not counting potatoes and salad, how often do you eat cooked vegetables?", 
    ["per day", "per week", "per month"],
      false, {
        "per day": {
            min: 0,
            max: 10,
            step: 0.5
        },
        "per week": {
            min: 0,
            max: 50,
            step: 1
        },
        "per month": {
            min: 0,
            max: 100,
            step: 1
        }
      }, true, undefined, false),
  new MultipleChoiceQuestion(104, "How much coffee do you drink each day?",
      ["I never drink coffee", "< 1 cup", "1 cup", "2 cups", "3 cups", "4 cups", "More than 4 cups per day"], true),
  new MultipleChoiceQuestion(105, "How many caffeinated tea (e.g., black tea, green tea) do you drink each day?",
      ["I never drink tea", "< 1 cup", "1 cup", "2 cups", "3 cups", "4 cups", "More than 4 cups per day"], true),
  new SectionIntroScreen(106.1,
      `The next questions are about your alcohol consumption and smoking habits.`),
  new MultipleChoiceQuestion(106, "How often do you have a drink containing alcohol?",
      ["Never", "Monthly or less", "2-4 times a month", "2-3 times a week", "4 or more times a week"], true),
  new MultipleChoiceQuestion(107, "How many standard drinks do you have on a typical day when you are drinking?",
      ["0,", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "More than 20"], true, undefined, "link://images/drink-standards.png"),
  new MultipleChoiceQuestion(108, "Do you, or have you ever, smoked cigarettes, cigars, pipes or any other tobacco products?",
      ["Yes, currently", "Yes, not currently", "Never"], true),
];

FoodAndHabitsQuestions.filter(q => 
  (q.getQuestionNumber() >= 84 && q.getQuestionNumber() <= 87) || q.getQuestionNumber() === 103).forEach(q => 
    (q as NumberQuestionV2).setDisplayNoneCheckbox("Rarely/Never")
);

(FoodAndHabitsQuestions.find(q => q.getQuestionNumber() === 87) as NumberQuestionV2).setContextLocation("below");