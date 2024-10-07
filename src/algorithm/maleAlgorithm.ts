import { Inputs } from "./types";

export function maleAlgorithm(inputs: Inputs) {
  let dementia_score = 0;
  let stroke_score = 0;
  let mi_score = 0;
  let diabetes_score = 0;

  // Age category conditions
  switch (inputs.age_cat) {
    case '65-69':
      dementia_score -= 8;
      stroke_score -= 2;
      mi_score += 3;
      diabetes_score += 5;
      break;
    case '70-74':
      // No changes for this age group
      break;
    case '75-79':
      dementia_score -= 11;
      stroke_score += 2;
      mi_score += 3;
      diabetes_score += 1;
      break;
    case '80-84':
      dementia_score += 15;
      stroke_score += 4;
      mi_score += 3;
      diabetes_score -= 8;
      break;
    case '85-89':
      dementia_score += 25;
      stroke_score -= 5;
      mi_score -= 2;
      diabetes_score -= 7;
      break;
    case '90+':
      dementia_score += 49;
      stroke_score -= 6;
      mi_score += 9;
      diabetes_score += 0;
      break;
  }

  // Education category conditions
  switch (inputs.edu_cat) {
    case 'less than secondary':
      dementia_score += 7;
      stroke_score -= 1;
      diabetes_score += 1;
      break;
    case 'upper secondary':
      dementia_score += 4;
      stroke_score -= 1;
      mi_score -= 2;
      diabetes_score += 1;
      break;
    case 'tertiary':
      // No changes for this education category
      break;
  }

  // BMI conditions
  switch (inputs.bmi) {
    case 'underweight':
      dementia_score += 11;
      stroke_score -= 1;
      mi_score += 12;
      break;
    case 'normal weight':
      // No changes for this BMI category
      break;
    case 'overweight':
      stroke_score += 2;
      mi_score += 5;
      diabetes_score += 12;
      break;
    case 'obese':
      dementia_score -= 1;
      stroke_score += 1;
      mi_score += 4;
      diabetes_score += 20;
      break;
  }

  // Cholesterol conditions
  if (inputs.cholesterol === 'high') {
    dementia_score += 4;
    stroke_score += 6;
    mi_score -= 3;
    diabetes_score += 6;
  }

  // HDL conditions
  if (inputs.low_hdl === 'yes') {
    dementia_score += 3;
    stroke_score -= 4;
    mi_score -= 1;
    diabetes_score -= 4;
  }

  // LDL conditions
  if (inputs.high_ldl === 'yes') {
    dementia_score += 2;
    stroke_score += 1;
    mi_score += 7;
    diabetes_score -= 8;
  }

  // Diabetes conditions
  if (inputs.diabetes === 'yes') {
    stroke_score += 3;
    mi_score += 5;
  }

  // High blood pressure conditions
  if (inputs.hbp === 'yes') {
    stroke_score += 4;
    mi_score += 1;
    diabetes_score += 4;
  }

  // TBI conditions
  if (inputs.tbi === 'yes') {
    stroke_score += 2;
    mi_score += 1;
  }

  // Stroke conditions
  if (inputs.stroke === 'yes') {
    dementia_score += 13;
    mi_score += 3;
  }

  // Atrial fibrillation conditions
  if (inputs.afib === 'yes') {
    dementia_score += 3;
    stroke_score += 5;
    mi_score += 7;
  }

  // Heart attack conditions
  if (inputs.heartattack === 'yes') {
    dementia_score -= 4;
    stroke_score += 3;
  }

  // Hearing loss conditions
  if (inputs.hearing_loss === 'yes') {
    dementia_score += 4;
    mi_score -= 2;
    diabetes_score += 1;
  }

  // Sleep disturbances sum condition
  const sleepSum = inputs.falling_asleep + inputs.staying_asleep + inputs.waking_early +
    inputs.dissatisfaction + inputs.noticeable + inputs.worried + inputs.interfere;
  if (sleepSum > 15) {
    stroke_score += 5;
    mi_score += 10;
    diabetes_score += 3;
  }

  // Psychological conditions sum
  const psychSum = inputs.bothered + inputs.mind + inputs.depressed + inputs.effort +
    inputs.future + inputs.fearful + inputs.sleep + inputs.happy + inputs.lonely + inputs.going;
  if (psychSum > 8) {
    dementia_score -= 2;
    stroke_score += 7;
    mi_score += 5;
    diabetes_score -= 1;
  }

  // Physical activity sum
  const activitySum = inputs.vigorous + inputs.moderate + inputs.walk;
  if (activitySum > 500) {
    dementia_score += 6;
    mi_score += 1;
    diabetes_score -= 2;
  }

  // Social engagement score
  const socialEngagement = (inputs.newspaper + inputs.magazines + inputs.books + inputs.games +
    inputs.brain_training + inputs.emails + inputs.social_media + inputs.stimulating +
    inputs.other_freq + inputs.museum + inputs.concert + inputs.library) / 12;

  if (socialEngagement < 3) {
    dementia_score += 0;
  } else if (socialEngagement >= 3 && socialEngagement <= 4) {
    dementia_score += 1;
  } else if (socialEngagement > 4) {
    dementia_score -= 13;
  }

  // Social isolation sum
  const socialSum = inputs.companion + inputs.left_out + inputs.isolated;
  if (socialSum > 5) {
    dementia_score += 4;
    stroke_score += 5;
    mi_score += 5;
    diabetes_score -= 2;
  }

  // Fruit and vegetable consumption
  if (inputs.fruitveg === 1) {
    stroke_score -= 6;
    mi_score += 11;
    diabetes_score += 1;
  }

  // Fish intake
  if (inputs.fish_intake === 1) {
    dementia_score += 2;
    mi_score -= 1;
  }

  // Alcohol conditions
  switch (inputs.alcohol) {
    case 0:
      break;
    case 1:
      dementia_score -= 5;
      stroke_score += 2;
      mi_score += 2;
      diabetes_score -= 4;
      break;
    case 2:
      dementia_score -= 1;
      stroke_score += 3;
      diabetes_score -= 1;
      break;
  }

  // Smoking conditions
  switch (inputs.smoking) {
    case 'non-smoker':
      break;
    case 'current':
      dementia_score -= 3;
      stroke_score -= 1;
      mi_score += 3;
      diabetes_score += 1;
      break;
    case 'former':
      stroke_score -= 3;
      mi_score -= 2;
      diabetes_score += 3;
      break;
  }

  // Return the final scores
  return {
    dementia_score,
    stroke_score,
    mi_score,
    diabetes_score
  };
}