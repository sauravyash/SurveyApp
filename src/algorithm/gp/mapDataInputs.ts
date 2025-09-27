import { Inputs } from "../types";

import {
  categorizeGender,
  categorizeAge,
  categorizeEducation,
  calculateBMI,
  categorizeCholesterol,
  categorizeHDL,
  categorizeLDL,
  categorizeHearingLoss,
  calculateExercise,
  categorizeSmoking,
  calculateFruitVeg,
  calculateFishIntake,
  categoryMapper
} from '../processSurveyData';
import { categoriseQ6 } from "./categoriseQ6";
import { categorizeAlcoholGP } from "./processGPData";

export const mapGPDataInputs = (data: Record<string, any>) => {
  const q6Result = categoriseQ6(data["6"]);
  // console.log("data", q6Result);
  const gender = categorizeGender(data["2"]);
  const inputs: Inputs = {
    // From new Q1 (Age)
    age_cat: categorizeAge(data["1"]),

    // From new Q2 (Gender)
    gender,

    // From new Q3 (Highest qualification)
    edu_cat: categorizeEducation(data["3"]),

    // From new Q4 (Height) and Q5 (Weight)
    bmi: calculateBMI(data["5"], data["4"]),

    // force categorization to only use high cholesterol if it's true
    cholesterol: categorizeCholesterol({ "mmol/L": 3 }, q6Result.highCholesterol ? "yes" : "no"),
    // Low-HDL and high-LDL, updated to use new Q2 for gender & Q7/8 for HDL/LDL
    high_ldl: categorizeHDL(data["7"], gender),
    low_hdl: categorizeLDL(data["8"]),

    diabetes: q6Result.diabetes ? "yes" : "no",
    hbp: q6Result.hbp ? "yes" : "no",
    tbi: q6Result.tbi ? "yes" : "no", 
    stroke: q6Result.stroke ? "yes" : "no",
    afib: q6Result.afib ? "yes" : "no",
    heartattack: q6Result.heartattack ? "yes" : "no",
    hearing_loss: categorizeHearingLoss(data["11"], ""),


    // ---- Sleep difficulties & satisfaction ----
    // New Q13, Q14, Q15 => difficulty falling/staying asleep, waking early
    falling_asleep: categoryMapper("sleep", data["13"]),
    staying_asleep: categoryMapper("sleep", data["14"]),
    waking_early: categoryMapper("sleep", data["15"]),

    // New Q16–19 => satisfaction, noticeable, worried, interference
    dissatisfaction: categoryMapper("satisfied", data["16"]),
    noticeable: categoryMapper("noticable", data["17"]),
    worried: categoryMapper("worried", data["18"]),
    interfere: categoryMapper("interfering", data["19"]),

    // ---- CES-D / “common” items ----
    // New Q20–29
    bothered: categoryMapper("common", data["20"]),
    mind: categoryMapper("common", data["21"]),
    depressed: categoryMapper("common", data["22"]),
    effort: categoryMapper("common", data["23"]),
    future: categoryMapper("common", data["24"]),
    fearful: categoryMapper("common", data["25"]),
    sleep: categoryMapper("common", data["26"]),
    happy: categoryMapper("common", data["27"]),
    lonely: categoryMapper("common", data["28"]),
    going: categoryMapper("common", data["29"]),

    // ---- Physical activity ----
    // New Q30–31 => vigorous; Q32–33 => moderate; Q34–35 => walking
    vigorous: calculateExercise(data["30"], data["31"]) * 8,
    moderate: calculateExercise(data["32"], data["33"]) * 4,
    walk: Math.round(calculateExercise(data["34"], data["35"]) * 3.3),

    // ---- Intellectual & cultural activities ----
    // New Q36–47
    newspaper: categoryMapper("frequency", data["36"]),
    magazines: categoryMapper("frequency", data["37"]),
    books: categoryMapper("frequency", data["38"]),
    games: categoryMapper("frequency", data["39"]),
    brain_training: categoryMapper("frequency", data["40"]),
    emails: categoryMapper("frequency", data["41"]),
    social_media: categoryMapper("frequency", data["42"]),
    stimulating: categoryMapper("frequency", data["43"]),

    // Q47 => “other intellectual/cognitive activities”
    other_freq: categoryMapper("frequency", data["48"]),

    // New Q44 => museum, Q45 => concert, Q46 => library
    museum: categoryMapper("frequency", data["44"]),
    concert: categoryMapper("frequency", data["45"]),
    library: categoryMapper("frequency", data["46"]),

    // ---- Companionship scale ----
    // Q49 => “How often do you feel that you lack companionship?”
    companion: categoryMapper("companionship", data["49"]),
    // “left_out” & “isolated” no longer appear => pass null
    left_out: categoryMapper("companionship", data["50"]),
    isolated: categoryMapper("companionship", data["51"]),

    // ---- Diet ----
    fish_intake: calculateFishIntake(data["52"]),
    fruitveg: calculateFruitVeg(data["53"], data["54"], data["56"]),

    // ---- Alcohol & Smoking ----
    alcohol: categorizeAlcoholGP(data["57"], data["58"]),
    smoking: categorizeSmoking(data["59"])
  };

  

  if (categoryMapper("frequency", data["71"]) === 5) {
    inputs.other_freq = 5;
  }

  return inputs;
}