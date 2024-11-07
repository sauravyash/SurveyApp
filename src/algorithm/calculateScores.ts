import { sampleData } from './sample_data.ts';

import {
  categorizeGender,
  categorizeAge,
  categorizeEducation,  
  calculateBMI,
  categorizeCholesterol,
  categorizeHDL,
  categorizeLDL,
  categorizeDiabetes,
  categorizeHBP,
  categorizeTBI,
  categorizeStroke,
  categorizeAFib,
  categorizeHeartAttack,
  categorizeHearingLoss,
  calculateExercise,
  categorizeSmoking,
  categorizeAlcohol,
  calculateFruitVeg,
  calculateFishIntake,
  categoryMapper
} from './processSurveyData';
import { Inputs, OutputResult, Scores } from './types';
import { publicScoring } from './public/index.ts';

export function processSurveyResponse(data: Record<string, any>): {scores: Scores, inputs: Inputs} {  
  const inputs: Inputs = {
    gender: categorizeGender(data["3"]), 
    age_cat: categorizeAge(data["1"]), 
    edu_cat: categorizeEducation(data["8"]), // Uses education data from key "8"
    bmi: calculateBMI(data["11"], data["10"]), 
    cholesterol: categorizeCholesterol(data["17"], data["18"]), 
    low_hdl: categorizeHDL(categorizeGender(data["3"]), data["19"]), 
    high_ldl: categorizeLDL(data["20"]), 
    diabetes: categorizeDiabetes(data["22"], data["23"]), // Diabetes diagnosis from key "22" and glucose value from key "23"
    hbp: categorizeHBP(data["26"], data["27"], data["29"]), // Systolic value from key "28", HBP diagnosis from key "27", and medication status from key "26"
    tbi: categorizeTBI(data["25"]),
    stroke: categorizeStroke(data["31"]), // Stroke diagnosis from key "29"
    afib: categorizeAFib(data["32"]), // Atrial fibrillation data from key "32"
    heartattack: categorizeHeartAttack(data["33"]), // Heart attack data from key "33"
    hearing_loss: categorizeHearingLoss(data["36"], data["37"]), // Hearing loss diagnosis from key "34" and adequacy from key "36"
    falling_asleep: categoryMapper("sleep", data["39"]), // Sleep issue severity from key "39"
    staying_asleep: categoryMapper("sleep",data["40"]), // Staying asleep issue severity from key "40"
    waking_early: categoryMapper("sleep",data["41"]), // Waking early severity from key "41"
    dissatisfaction: categoryMapper("satisfied", data["42"]), // Satisfaction level from key "42"
    noticeable: categoryMapper("noticable", data["43"]), // Noticeable dissatisfaction from key "43"
    worried: categoryMapper("worried", data["44"]), // Worried categorization from key "44"
    interfere: categoryMapper("interfering", data["45"]), // Interference categorization from key "45"
    bothered: categoryMapper("common", data["46"]), // Bothered by problems (key "46")
    mind: categoryMapper("common", data["47"]), // Mind severity from key "47"
    depressed: categoryMapper("common", data["48"]), // Depression severity from key "48"
    effort: categoryMapper("common", data["49"]), // Effort severity from key "49"
    future: categoryMapper("common", data["50"]), // Future outlook severity from key "50"
    fearful: categoryMapper("common", data["51"]), // Fearfulness from key "51"
    sleep: categoryMapper("common", data["52"]), // Sleep quality severity from key "52"
    happy: categoryMapper("common", data["53"]), // Happiness categorization from key "53"
    lonely: categoryMapper("common", data["54"]), // Loneliness from key "54"
    going: categoryMapper("common", data["55"]), // Going through with plans severity from key "55"
    vigorous: calculateExercise(data["56"], data["57"]) * 8, // Vigorous exercise: key "56" for days, "57" for hours and minutes
    moderate: calculateExercise(data["58"], data["59"]) * 4, // Moderate exercise: key "58" for days, "59" for hours and minutes
    walk: calculateExercise(data["60"], data["61"]) * 3.3, // Walking exercise: key "60" for days, "61" for hours and minutes
    newspaper: categoryMapper("frequency", data["63"]),
    magazines: categoryMapper("frequency", data["64"]),
    books: categoryMapper("frequency", data["65"]),
    games: categoryMapper("frequency", data["66"]),
    brain_training: categoryMapper("frequency", data["67"]),
    emails: categoryMapper("frequency", data["68"]),
    social_media: categoryMapper("frequency", data["69"]),
    stimulating: categoryMapper("frequency", data["70"]),
    other_freq: categoryMapper("frequency", data["72"]), // CHECK
    museum: categoryMapper("frequency", data["73"]),
    concert: categoryMapper("frequency", data["74"]),
    library: categoryMapper("frequency", data["75"]),
    companion: categoryMapper("companionship", data["77"]),
    left_out: categoryMapper("companionship", data["78"]),
    isolated: categoryMapper("companionship", data["79"]),
    fruitveg: calculateFruitVeg(data["80"], data["81"], data["83"]), // fruit freq not used
    fish_intake: calculateFishIntake(data["96"]),
    alcohol: categorizeAlcohol(data["106"], data["107"]),
    smoking: categorizeSmoking(data["108"])
  };

  if (categoryMapper("frequency", data["71"]) === 5) {
    inputs.other_freq = 5;
  }

  const res : OutputResult = {
    scores: {
      dementia_score: 0,
      stroke_score: 0,
      mi_score: 0,
      diabetes_score: 0
    },
    inputs
  };

  res.scores = publicScoring(inputs);

  return res;
}

// Export the function to be used in the main file    
export default processSurveyResponse;


async function test() {
  const res = processSurveyResponse(sampleData);
  console.log(res);
}

test();
  
