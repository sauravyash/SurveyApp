import { clampNum, isYes } from "../helpers";
import { Inputs, Scores } from "../types";

/** GP — FEMALE (updated from Excel GP sheet) */
export function femaleAlgorithm(inputs: Inputs): Scores {
  // Use string categories (reuses your current, lighter imports)
  const age_cat = inputs.age_cat ?? 'unknown';
  const edu_cat = inputs.edu_cat ?? 'unknown';
  const bmi = inputs.bmi ?? 'unknown';

  const cholesterol = inputs.cholesterol ?? 'unknown';
  const low_hdl = inputs.low_hdl ?? 'unknown';
  const high_ldl = inputs.high_ldl ?? 'unknown';

  const diabetes = inputs.diabetes ?? 'unknown';
  const hbp = inputs.hbp ?? 'unknown';
  const tbi = inputs.tbi ?? 'unknown';
  const prior_stroke = inputs.stroke ?? 'unknown';
  const afib = inputs.afib ?? 'unknown';
  const heartattack = inputs.heartattack ?? 'unknown';
  const hearing_loss = inputs.hearing_loss ?? 'unknown';

  const falling_asleep = clampNum(inputs.falling_asleep, 0, 10);
  const staying_asleep = clampNum(inputs.staying_asleep, 0, 10);
  const waking_early = clampNum(inputs.waking_early, 0, 10);
  const dissatisfaction = clampNum(inputs.dissatisfaction, 0, 10);
  const noticeable = clampNum(inputs.noticeable, 0, 10);
  const worried = clampNum(inputs.worried, 0, 10);
  const interfere = clampNum(inputs.interfere, 0, 10);

  const bothered = clampNum(inputs.bothered, 0, 10);
  const mind = clampNum(inputs.mind, 0, 10);
  const depressed = clampNum(inputs.depressed, 0, 10);
  const effort = clampNum(inputs.effort, 0, 10);
  const future = clampNum(inputs.future, 0, 10);
  const fearful = clampNum(inputs.fearful, 0, 10);
  const sleepP = clampNum(inputs.sleep, 0, 10);
  const happy = clampNum(inputs.happy, 0, 10);
  const lonely = clampNum(inputs.lonely, 0, 10);
  const going = clampNum(inputs.going, 0, 10);

  const vigorous = clampNum(inputs.vigorous, 0, 2000);
  const moderate = clampNum(inputs.moderate, 0, 2000);
  const walk = clampNum(inputs.walk, 0, 2000);

  const newspaper = clampNum(inputs.newspaper, 0, 5);
  const magazines = clampNum(inputs.magazines, 0, 5);
  const books = clampNum(inputs.books, 0, 5);
  const games = clampNum(inputs.games, 0, 5);
  const brain_training = clampNum(inputs.brain_training, 0, 5);
  const emails = clampNum(inputs.emails, 0, 5);
  const social_media = clampNum(inputs.social_media, 0, 5);
  const stimulating = clampNum(inputs.stimulating, 0, 5);
  const other_freq = clampNum(inputs.other_freq, 0, 5);
  const museum = clampNum(inputs.museum, 0, 5);
  const concert = clampNum(inputs.concert, 0, 5);
  const library = clampNum(inputs.library, 0, 5);

  const companion = clampNum(inputs.companion, 0, 10);
  const left_out = clampNum(inputs.left_out, 0, 10);
  const isolated = clampNum(inputs.isolated, 0, 10);

  const fish_intake = (inputs.fish_intake ?? 0) as 0|1;
  const fruitveg = (inputs.fruitveg ?? 0) as 0|1;

  const alcohol = inputs.alcohol ?? 0;                 // 0,1,2
  const smoking = (inputs.smoking ?? 'non-smoker') as 'non-smoker'|'current'|'former';

  let dementia_score = 0;
  let stroke_score = 0;
  let mi_score = 0;
  let diabetes_score = 0;

  // AGE
  switch (age_cat) {
    case '65-69': dementia_score += -8; stroke_score += -2; mi_score += 3; diabetes_score += 5; break;
    case '70-74': break;
    case '75-79': dementia_score += 11; stroke_score += 2; mi_score += 3; diabetes_score += 1; break;
    case '80-84': dementia_score += 15; stroke_score += 4; mi_score += 3; diabetes_score += -8; break;
    case '85-89': dementia_score += 25; stroke_score += -5; mi_score += -2; diabetes_score += -7; break;
    case '90+':   dementia_score += 49; stroke_score += -6; mi_score += 9; break; // diabetes N/A
  }

  // EDUCATION
  switch (edu_cat) {
    case 'less than secondary': dementia_score += 7; stroke_score += -1; mi_score += 0; diabetes_score += 1; break;
    case 'upper secondary':     dementia_score += 4; stroke_score += -1; mi_score += -2; diabetes_score += 1; break;
    case 'tertiary':            break;
  }

  // BMI
  switch (bmi) {
    case 'underweight':  dementia_score += 11; stroke_score += -1; mi_score += 12; diabetes_score += 0; break;
    case 'normal weight': break;
    case 'overweight':   dementia_score += 0; stroke_score += 2; mi_score += 5; diabetes_score += 12; break;
    case 'obese':        dementia_score += -1; stroke_score += 1; mi_score += 4; diabetes_score += 20; break;
  }

  // CONDITIONS
  if (isYes(diabetes))     { dementia_score += 0; stroke_score += 3; mi_score += 5; /* diab 0 */ }
  if (isYes(hbp))          { dementia_score += 0; stroke_score += 4; mi_score += 1; diabetes_score += 4; }
  if (cholesterol === 'high') { dementia_score += 4; stroke_score += 6; mi_score += -3; diabetes_score += 6; }
  if (isYes(tbi))          { dementia_score += 0; stroke_score += 2; mi_score += 1; /* diab 0 */ }
  if (isYes(prior_stroke)) { dementia_score += 13; mi_score += 3; }
  if (isYes(afib))         { dementia_score += 3; stroke_score += 5; mi_score += 7; }
  if (isYes(heartattack))  { dementia_score += -4; stroke_score += 3; }
  if (isYes(low_hdl))      { dementia_score += 3; stroke_score += -4; mi_score += -1; diabetes_score += -4; }
  if (isYes(high_ldl))     { dementia_score += 2; stroke_score += 1; mi_score += 7; diabetes_score += -8; }
  if (isYes(hearing_loss)) { dementia_score += 4; mi_score += -2; diabetes_score += 1; }

  // SLEEP > 15
  const sleepSum =
    falling_asleep + staying_asleep + waking_early +
    dissatisfaction + noticeable + worried + interfere;
  if (sleepSum > 15) { dementia_score += 0; stroke_score += 5; mi_score += 10; diabetes_score += 3; }

  // MOOD > 8
  const moodSum =
    bothered + mind + depressed + effort + future +
    fearful + sleepP + happy + lonely + going;
  if (moodSum > 8) { dementia_score += -2; stroke_score += 7; mi_score += 5; diabetes_score += -1; }

  // ACTIVITY > 500
  const activitySum = vigorous + moderate + walk;
  if (activitySum > 500) { dementia_score += 6; mi_score += 1; diabetes_score += -2; }

  // COGNITIVE avg
  const cogTotal =
    newspaper + magazines + books + games + brain_training +
    emails + social_media + stimulating + other_freq +
    museum + concert + library;
  const cogAvg = cogTotal / 12;
  if (cogAvg >= 3 && cogAvg <= 4) dementia_score += 1;
  else if (cogAvg > 4) dementia_score += -13;

  // SOCIAL ISOLATION > 5
  const isoSum = companion + left_out + isolated;
  if (isoSum > 5) { dementia_score += 4; stroke_score += 5; mi_score += 5; diabetes_score += -2; }

  // DIET
  if (fish_intake === 1) { dementia_score += 2; mi_score += -1; }
  if (fruitveg === 1) { stroke_score += -6; mi_score += 11; diabetes_score += 1; }

  // ALCOHOL
  switch (alcohol as 0|1|2) {
    case 1: dementia_score += -5; stroke_score += 2; mi_score += 2; diabetes_score += -4; break;
    case 2: dementia_score += -1; stroke_score += 3; diabetes_score += -1; break;
  }

  // SMOKING
  switch (smoking) {
    case 'current': dementia_score += -3; stroke_score += -1; mi_score += 3; diabetes_score += 1; break;
    case 'former':  stroke_score += -3; mi_score += -2; diabetes_score += 3; break;
  }

  return { dementia_score, stroke_score, mi_score, diabetes_score };
}
