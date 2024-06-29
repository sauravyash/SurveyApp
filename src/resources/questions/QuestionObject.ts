class BaseQuestionObject {
    private question_number: number;
    private question_text: string;
    private type: string;
    private optional: boolean = false;
    private scoring: boolean = false;
    private conditions: { question: number, answer: string }[];

    constructor(id: number, question: string, type: string, scoring: boolean = false, optional: boolean = false,
        conditions: { question: number, answer: string }[] = []
    ) {
        this.question_number = id;
        this.question_text = question;
        this.type = type;
        this.scoring = scoring;
        this.optional = optional;
        this.conditions = conditions;
    }

    public getAttributes() {
        return {
            question_number: this.question_number,
            question: this.question_text,
            type: this.type,
            optional: this.optional,
            scoring: this.scoring
        }
    }

    public getQuestion() {
        return this.question_text;
    }

    public getQuestionNumber() {
        return this.question_number
    }

    public getType() {
        return this.type;
    }
    public getConditions() {
        return this.conditions;
    }
}

class DateQuestion extends BaseQuestionObject {
    constructor(id: number, question: string) {
        super(id, question, 'date');
    }
}

class MultipleChoiceQuestion extends BaseQuestionObject {
    private options: string[];


    constructor(id: number, question: string, options: string[], scoring: boolean = false,
        conditions: { question: number, answer: string }[] = []) {
        super(id, question, 'multiple-choice', scoring, true, conditions);
        this.options = options;
    }

    public getAttributes() {
        let attributes = {
            ...super.getAttributes(),
            options: this.options
        };
        return attributes;
    }

    public getOptions() {
        return this.options;
    }
}

class TextQuestion extends BaseQuestionObject {
    constructor(id: number, question: string, scoring: boolean = false) {
        super(id, question, 'text', scoring);
    }
}

class NumberQuestion extends BaseQuestionObject {
    private minValue: number;
    private maxValue: number;
    private defaultValue: any;
    private units: string[];
    private scientific_unit: boolean;
    private step: number = 1;

    constructor(
        id: number,
        question: string,
        units: string[] = [],
        scientific_unit: boolean = false,
        minValue: number = 0,
        maxValue: number = 1000,
        defaultValue: any = 0,
        scoring: boolean = true,
        conditions: { question: number, answer: string }[] = [],
        optional: boolean = false,
        step: number = 1
    ) {
        super(id, question, 'number', scoring, optional, conditions);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.defaultValue = defaultValue;
        this.units = units;
        this.scientific_unit = scientific_unit;
        this.step = step;
    }

    public getMinValue() {
        return this.minValue;
    }

    public getMaxValue() {
        return this.maxValue;
    }

    public getDefaultValue() {
        return this.defaultValue;
    }

    public getAttributes() {
        return {
            ...super.getAttributes(),
            options: this.units,
            scientific_unit: this.scientific_unit,
            step: this.step
        };
    }

    public getUnits() {
        return this.units;
    }
}

class WaistMeasurementQuestion extends BaseQuestionObject {
    private options: {
        conditions: "default" | {
            question: number,
            answer: string,
            modifier?: string
        }[];
        male: string[];
        female: string[];
    }[];

    constructor(
        id: number,
        question: string,
        options: {
            conditions: "default" | {
                question: number,
                answer: string,
                modifier?: string
            }[];
            male: string[];
            female: string[];
        }[],
        scoring: boolean = true
    ) {
        super(id, question, 'waist-measurement', scoring);
        this.options = options;
    }

    public getAttributes() {
        let attributes = {
            ...super.getAttributes(),
            options: this.options
        };
        return attributes;
    }

    public getOptions() {
        return this.options;
    }
}

class RangeSelectionQuestion extends BaseQuestionObject {
    private options: {
        [key: number]: string
    } = {};

    constructor(
        id: number, 
        question: string, 
        options: { [key: number]: string }, 
        scoring: boolean = true, 
        optional: boolean = false
    ) {
        super(id, question, 'range-selection', scoring, optional);
        this.options = options;
    }

    public getOptions() {
        return this.options;
    }
}


const PersonalInformationQuestions = [
    new NumberQuestion(1, "What is your age?", ["year"], false, 0, 130, 50),
    new DateQuestion(2, "What is your date of birth? (dd/mm/yyyy)"),
    new MultipleChoiceQuestion(3, "What is your gender?", ["Male", "Female", "Non-Binary", "Other identity", "Prefer not to say"], true),
    new MultipleChoiceQuestion(4, "Where were you born?", ["Australia", "Asia", "Middle East", "North Africa", "Southern Europe", "Other"], true),
    new MultipleChoiceQuestion(5, "Are you of Aboriginal, Torres Strait Islander origin, Pacific Islander or Māori descendent?", ["No", "Yes, Aboriginal", "Yes, Torres Strait Islander", "Both Aboriginal and Torres Strait Islander", "Pacific Islander or Māori descendent", "Other", "Prefer not to say"], true),
    new MultipleChoiceQuestion(6, "Do you speak a language other than English at home?", ["No, English only", "Yes, Mandarin", "Yes, Italian", "Yes, Arabic", "Yes, Cantonese", "Yes, Greek", "Yes, Vietnamese", "Yes, other- please specify ________"]),
    new NumberQuestion(7, "How many languages are you fluent in?", ["language"]),
    new MultipleChoiceQuestion(8, "What was the highest qualification that you completed?", ["Partially completed primary/elementary school (or equivalent)", "Completed primary/elementary school (or equivalent)", "School certificate (Year 10) (or equivalent)", "Higher school certificate (Year 12) (or equivalent)", "Trade certificate/apprenticeship", "Technician’s certificate/advanced certificate", "Certificate other than above", "Associate diploma", "Undergraduate diploma", "Bachelor’s degree", "Post graduate diploma/certificate", "Higher degree"], true),
    new MultipleChoiceQuestion(9, "Are you currently in a relationship with someone?", ["Yes, living with the person you are married to", "Yes, living with a partner (but not married to them)", "Yes, in a relationship with someone but not living with them", "Yes, married or have a partner but NOT living together as one is in a hostel/nursing home/hospital or for other reasons", "No, not in a relationship with anyone"]),
    new NumberQuestion(10, "Enter your height in either cm or feet/inches",
        ["cm", "feet/inches"],
        true,
        0,
        300,
        160,
    ),
    new NumberQuestion(
        11,
        "Enter your weight in kgs or stones/pounds",
        ["kg", "stone/pounds", "lb"],
        true,
        0,
        500,
        100,
    ),
    new WaistMeasurementQuestion(12, "Your waist measurement taken below the ribs (usually at the level of the navel, and while standing)", [
        {
            conditions: [
                {
                    question: 4,
                    answer: "Asia"
                },
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
    new MultipleChoiceQuestion(13, "Have either of your parents, or any of your brothers or sisters been diagnosed with diabetes (type 1 or type 2)?", ["No", "Yes (Type 1)", "Yes (Type 2)", "Don’t know"]),
    new MultipleChoiceQuestion(14, "Have either of your parents, or any of your brothers or sisters been diagnosed with stroke?", ["No", "Yes", "Don’t know"]),
    new MultipleChoiceQuestion(15, "Have either of your parents, or any of your brothers or sisters been diagnosed with dementia or cognitive impairment?", ["No", "Yes", "Don’t know"]),
    new MultipleChoiceQuestion(16, "Have either of your parents, or any of your brothers or sisters been diagnosed with premature cardiovascular disease or myocardial infarction?", ["No", "Yes", "Don’t know"]),
];

const HealthQuestions = [
    new NumberQuestion(17, "What is your total cholesterol level? (in last two years)", ["mmol/L"], false, 0, 20, 5.5, true, undefined, false, 0.1),
    new MultipleChoiceQuestion(18, 
        "Have you been told by a doctor or a health professional that you have high cholesterol levels in the past 2 years, or your cholesterol level is higher than 6.5mmol/L?", 
        ["Yes", "No", "Don’t know"]
    ),
    new NumberQuestion(19, "What is your HDL cholesterol level?", ["mmol/L"], false, 0, 20, 1.5, true, undefined, false, 0.1),
    new NumberQuestion(20, "What is your LDL cholesterol level?", ["mmol/L"], false, 0, 20, 3.5, true, undefined, false, 0.1),
    new NumberQuestion(21, "What are your triglyceride levels?", ["mmol/L"], false, 0, 20, 1.7, true, undefined, false, 0.1),
    new MultipleChoiceQuestion(22, "Have you ever been told by a doctor or other health professional that you have diabetes?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(23, "Have you been found to have high blood glucose (sugar) (for example, in a health examination, during an illness, during pregnancy) or fasting glucose above 7 mmol/L?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(24, "Have you ever had a head injury or blow to the head that caused you to be dazed, confused, disoriented, or be knocked out?", ["Yes, I lost consciousness (knocked out)", "Yes, I was dazed, confused, or disoriented but did not lose consciousness", "No", "Don’t know"]),
    new MultipleChoiceQuestion(25, "For how long were you unconscious because of your head injury?", ["Less than 30mins", "Between 30mins to 24 hours", "More than 24 hours"]),
    new NumberQuestion(26, "What is your systolic BP?", ["mmHg"], false, 0, 300, 120, true),
    new MultipleChoiceQuestion(27, "Has your doctor ever told you that you had high blood pressure?",
        ["Yes", "No", "Don’t know"]
    ),
    new NumberQuestion(28, "Could you please specify at what age were you first told that you had high blood pressure?", ["year"], false, 0, 130, 50, true,
        [{
            question: 27,
            answer: "Yes"
        }]
    ),
    new MultipleChoiceQuestion(29, "Are you currently taking medications for controlling your high blood pressure?", ["Yes", "No"], true, [{
        question: 27,
        answer: "Yes"
    }]),
    new NumberQuestion(30, "Could you please specify at what age you started taking medications for high blood pressure?", ["year"], false, 0, 130, 50, true),
    new MultipleChoiceQuestion(31, "Have you ever been told by a doctor that you had a stroke or TIA (transient ischemic attack)?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(32, "Have you ever been told by your doctor that you have a heart condition like atrial fibrillation/arrhythmias (irregular heartbeats) with/without stroke?", ["Atrial fibrillation with stroke", "Atrial fibrillation without stroke", "No atrial fibrillation", "Don’t know"]),
    new MultipleChoiceQuestion(33, "Have you ever been told by your doctor that you have a condition called Left Ventricular Hypertrophy detected by ECG?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(34, "Have you ever been told by your doctor that you had a cardiovascular disease?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(35, "Have you ever been told by your doctor that you had a heart attack or a myocardial infarction?", ["Yes", "No", "Don’t know"]),
    new MultipleChoiceQuestion(36, "Have you been told by a doctor or health professional that you have hearing problems?",
        ["Yes, I was prescribed hearing aids/implant and wear them",
            "Yes, I was prescribed hearing aids but do not wear them",
            "No",
            "Don’t know"
        ],
    ),
    new MultipleChoiceQuestion(37, "Do you feel that your hearing is adequate for all purposes?", ["Yes", "Cannot hear speech in groups."],
        true,
        [{
            question: 36,
            answer: "No"
        }, {
            question: 36,
            answer: "Don’t know"
        }]
    ),
    new MultipleChoiceQuestion(38, "Have you ever been told by a doctor that you have had kidney disease?", ["Yes", "No", "Don’t know"]),
]

const sleepQuestionOptions = {
    0: "None",
    1: "Mild",
    2: "Moderate",
    3: "Severe",
    4: "Very Severe"
}

const SleepQuestions = [
    new RangeSelectionQuestion(39, "Difficulty falling asleep", sleepQuestionOptions),
    new RangeSelectionQuestion(40, "Difficulty staying asleep", sleepQuestionOptions),
    new RangeSelectionQuestion(41, "Problems waking up too early", sleepQuestionOptions),
    new MultipleChoiceQuestion(42, "How satisfied/dissatisfied are you with your current sleep pattern?",
        ["Very satisfied", "Satisfied", "Moderately Satisfied", "Dissatisfied", "Very Dissatisfied"], true),
    new MultipleChoiceQuestion(43, "How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?",
        ["Not at all Noticeable", "A Little", "Somewhat", "Much", "Very Much Noticeable"], true),
    new MultipleChoiceQuestion(44, "How worried/distressed are you about your current sleep problem?",
        ["Not at all Worried", "A Little", "Somewhat", "Much", "Very Much Worried"], true),
    new MultipleChoiceQuestion(45, "To what extent do you consider your sleep problem to interfere with your daily functioning (e.g., daytime fatigue, mood, ability to function at work/daily chores, concentration, memory, mood, etc.) currently?",
        ["Not at all Interfering", "A Little", "Somewhat", "Much", "Very Much Interfering"], true),
];

const commonOptions = {
    0: "Rarely or none of the time (less than 1 day)",
    1: "Some or a little of the time (1-2 days)",
    2: "Occasionally or a moderate amount of time (3-4 days)",
    3: "Most or all of the time (5-7 days)"
};

const FeelingsQuestions: RangeSelectionQuestion[] = [
    new RangeSelectionQuestion(46, "I was bothered by things that usually don't bother me.", commonOptions),
    new RangeSelectionQuestion(47, "I had trouble keeping my mind on what I was doing.", commonOptions),
    new RangeSelectionQuestion(48, "I felt depressed.", commonOptions),
    new RangeSelectionQuestion(49, "I felt that everything I did was an effort.", commonOptions),
    new RangeSelectionQuestion(50, "I felt hopeful about the future.", commonOptions),
    new RangeSelectionQuestion(51, "I felt fearful.", commonOptions),
    new RangeSelectionQuestion(52, "My sleep was restless.", commonOptions),
    new RangeSelectionQuestion(53, "I was happy.", commonOptions),
    new RangeSelectionQuestion(54, "I felt lonely.", commonOptions),
    new RangeSelectionQuestion(55, "I could not \"get going\"", commonOptions)
];


const PhysicalActivityQuestions = [
    new NumberQuestion(56, "During the last 7 days, on how many days did you do vigorous physical activities like heavy lifting, digging, aerobics, or fast bicycling?", ["days per week"], false, 0, 7, 0, true),
    new NumberQuestion(57, "How much time did you usually spend doing vigorous physical activities on one of those days?", ["hours per day", "minutes per day"], false, 0, 24, 0, true),
    new NumberQuestion(58, "During the last 7 days, on how many days did you do moderate physical activities like carrying light loads, bicycling at a regular pace, or doubles tennis? Do not include walking.", ["days per week"], false, 0, 7, 0, true),
    new NumberQuestion(59, "How much time did you usually spend doing moderate physical activities on one of those days?", ["hours per day", "minutes per day"], false, 0, 24, 0, true),
    new NumberQuestion(60, "During the last 7 days, on how many days did you walk for at least 10 minutes at a time?", ["days per week"], false, 0, 7, 0, true),
    new NumberQuestion(61, "How much time did you usually spend walking on one of those days?", ["hours per day", "minutes per day"], false, 0, 24, 0, true),
];

const LeisureActivityQuestions = [
    new MultipleChoiceQuestion(62, "About how much time do you spend reading each day, including online reading?",
        ["None", "Less than one hour", "One to less than 2 hours", "Two to less than 3 hours", "Three or more hours", "Don't know"], true),
    new MultipleChoiceQuestion(63, "Thinking of the last year, how often do you read newspapers, including online?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(64, "During the past year, how often did you read magazines, including online?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(65, "During the past year, how often did you read books?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(66, "During the past year, how often did you play games like checkers or other board games, cards, puzzles, word games, mind teasers, or any other similar games? (This includes online games)",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(67, "During the past year, how often did you participate in 'brain training' activities? This includes online and computer activities to improve memory and thinking such as Sudoku, and crosswords.",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(68, "During the past year, how often did you write letters or emails?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(69, "During the past year, how often did you use online social network activities like Facebook/ Twitter?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(70, "During the past year, how often in your paid or unpaid job/work did you participate in intellectually stimulating activities like problem solving, balancing budgets/accounts, any quantitative/ numerical activities, computer coding, or formulating correspondence?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new TextQuestion(71, "Apart from the above questions, did you participate in other intellectual and cognitively stimulating activities?"),
    new MultipleChoiceQuestion(72, "If yes, how often did you participate in the above activities?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(73, "In the past year, how many times did you visit a museum?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(74, "In the past year, how many times did you attend a concert, play, or musical?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
    new MultipleChoiceQuestion(75, "In the past year, how often did you visit a library?",
        ["Every day or almost everyday", "Several times a week", "Several times a month", "Several times a year", "Once a year or less", "Don't know"], true),
];

const CompanionshipQuestions = [
    new MultipleChoiceQuestion(76, "Do you live alone or with other people?",
        ["Live alone or with spouse only", "Live with extended family (children and grandchildren)"], true),
    new MultipleChoiceQuestion(77, "How often do you feel that you lack companionship?",
        ["Hardly ever", "Some of the time", "Often"], true),
    new MultipleChoiceQuestion(78, "How often do you feel left out?",
        ["Hardly ever", "Some of the time", "Often"], true),
    new MultipleChoiceQuestion(79, "How often do you feel isolated from others?",
        ["Hardly ever", "Some of the time", "Often"], true),
];

const FoodAndHabitsQuestions = [
    new MultipleChoiceQuestion(80, "How often do you eat vegetables?", ["Every day", "Not every day"], true),
    new MultipleChoiceQuestion(81, "How many serves of vegetables do you usually eat each day?",
        ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat vegetables"], true),
    new MultipleChoiceQuestion(82, "How often do you eat fruits?", ["Every day", "Not every day"], true),
    new MultipleChoiceQuestion(83, "How many serves of fruits do you usually eat each day?",
        ["1 serve or less", "2 serves", "3 serves", "4 serves", "5 serves", "6 serves or more", "Don't eat fruits"], true),
    new NumberQuestion(84, "How often do you drink fruit juices such as orange, grapefruit or tomato?", ["per day", "per week", "per month", "rarely or never"], false, 0, 100, 0, true),
    new NumberQuestion(85, "How often do you eat chips, French fries, wedges, fried potatoes or crisps?", ["per day", "per week", "per month", "rarely or never"], false, 0, 100, 0, true),
    new NumberQuestion(86, "How often do you eat potatoes?", ["per day", "per week", "per month", "rarely or never"], false, 0, 100, 0, true),
    new NumberQuestion(87, "How often do you eat salad?", ["per day", "per week", "per month", "rarely or never"], false, 0, 100, 0, true),
    new MultipleChoiceQuestion(88, "How often do you eat green leafy vegetables (spinach, lettuce, kale)?",
        ["Less than 2 servings per week", "2-5 servings per week", "6 or more servings per week"], true),
    new MultipleChoiceQuestion(89, "How often do you eat other vegetables?",
        ["Less than 5 servings per week", "5-6 servings per week", "7 or more servings per week"], true),
    new MultipleChoiceQuestion(90, "How often do you eat berries (e.g. blueberries, strawberries)?",
        ["Less than 1 serving per week", "Less than 2 serving per week", "More than 2 servings per week"], true),
    new MultipleChoiceQuestion(91, "How often do you eat nuts?",
        ["Less than 1 serving per month", "Less than 5 serving per week", "More than 5 servings per week"], true),
    new MultipleChoiceQuestion(92, "What is the primary cooking oil that you use?",
        ["Olive oil", "Vegetable oil", "Coconut oil", "Other"], true),
    new MultipleChoiceQuestion(93, "How much butter or margarine do you use?",
        ["Less than 1 tablespoon per day", "1 to 2 tablespoon per day", "More than 2 tablespoons per day"], true),
    new MultipleChoiceQuestion(94, "How many servings of cheese you eat per week?",
        ["Less than 1 serving per week", "1 to 6 servings per week", "7 or more servings per week"], true),
    new MultipleChoiceQuestion(95, "How many servings of whole grains do you eat per week?",
        ["Less than 1 serving per day", "1 to 2 servings per day", "3 or more servings per day"], true),
    new MultipleChoiceQuestion(96, "How often do you eat a serving of fish or seafood that is not deep-fried?",
        ["Rarely", "1-3 times per month", "Once a week", "2-3 times per week", "4 or more times per week"], true),
    new MultipleChoiceQuestion(97, "How often do you eat beans?",
        ["Less than 1 meal per week", "1 to 3 meals per week", "More than 3 meals per week"], true),
    new MultipleChoiceQuestion(98, "How often do you eat poultry (not fried)?",
        ["Less than 1 meal per week", "Less than 2 meals per week", "More than 2 meals per week"], true),
    new MultipleChoiceQuestion(99, "How often do you eat red meat and meat products?",
        ["Less than 4 meals per week", "4 to 6 meals per week", "More than 6 meals per week"], true),
    new MultipleChoiceQuestion(100, "How often do you eat fast fried foods?",
        ["Less than once per week", "1 to 3 meals per week", "4 or more meals per week"], true),
    new MultipleChoiceQuestion(101, "How many servings of pastries or sweets do you eat per week?",
        ["Less than 5 servings per week", "5 to 6 servings per week", "7 or more servings per week"], true),
    new MultipleChoiceQuestion(102, "How many glasses of wine (red or white) do you drink?",
        ["I never drink wine", "Less than 1 glass per day", "One glass per day", "More than one glass per day"], true),
    new NumberQuestion(103, "Not counting potatoes and salad, how often do you eat cooked vegetables?", ["per day", "per week", "per month", "rarely or never"], false, 0, 100, 0, true),
    new MultipleChoiceQuestion(104, "How much coffee do you drink each day?",
        ["I never drink coffee", "< 1 cup", "1 cup", "2 cups", "3 cups", "4 cups", "More than 4 cups per day"], true),
    new MultipleChoiceQuestion(105, "How many caffeinated tea (e.g., black tea, green tea) do you drink each day?",
        ["I never drink tea", "< 1 cup", "1 cup", "2 cups", "3 cups", "4 cups", "More than 4 cups per day"], true),
    new MultipleChoiceQuestion(106, "How often do you have a drink containing alcohol?",
        ["Never", "Monthly or less", "2-4 times a month", "2-3 times a week", "4 or more times a week"], true),
    new NumberQuestion(107, "How many standard drinks do you have on a typical day when you are drinking?", ["drinks"], false, 1, 20, 1, true),
    new MultipleChoiceQuestion(108, "Do you, or have you ever, smoked cigarettes, cigars, pipes or any other tobacco products?",
        ["Yes, currently", "Yes, not currently", "Never"], true),
];

const EnvironmentalExposuresQuestions = [
    new MultipleChoiceQuestion(109, "Have you ever been involved with mixing, applying or loading any pesticide, herbicide, weed killers, fumigants or fungicides?",
        ["Yes", "No", "Don't know"], true),
];

const QuestionSections = [
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

export default QuestionSections;
export {
    BaseQuestionObject,
    DateQuestion,
    MultipleChoiceQuestion,
    TextQuestion,
    NumberQuestion,
    WaistMeasurementQuestion,
    RangeSelectionQuestion
};


