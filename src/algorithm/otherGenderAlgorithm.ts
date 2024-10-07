import { Inputs } from "./types";

export function otherGenderAlgorithm(inputs: Inputs) {
  let dementia_score = 0;
  let stroke_score = 0;
  let mi_score = 0;
  let diabetes_score = 0;

  // Age category conditions
  switch (inputs.age_cat) {
    case '65-69':
      dementia_score -= 8.5;
      stroke_score -= 1;
      mi_score += 2.5;
      diabetes_score += 4;
      break;
    case '70-74':
      // No changes for this age group
      break;
    case '75-79':
      dementia_score += 9.5;
      stroke_score += 3;
      mi_score += 3;
      diabetes_score -= 2;
      break;
    case '80-84':
      dementia_score += 14.5;
      stroke_score += 3;
      mi_score += 2;
      diabetes_score -= 8.5;
      break;
    case '85-89':
      dementia_score += 24.5;
      stroke_score -= 2.5;
      mi_score -= 1;
      diabetes_score -= 14;
      break;
    case '90+':
      dementia_score += 40.5;
      stroke_score -= 10.5;
      mi_score += 3.5;
      break;
  }

  // Education category conditions
  switch (inputs.edu_cat) {
    case 'less than secondary':
      dementia_score += 5;
      stroke_score += 1.5;
      mi_score += 2;
      diabetes_score += 5.5;
      break;
    case 'upper secondary':
      dementia_score += 3;
      stroke_score += 1.5;
      mi_score += 1.5;
      diabetes_score += 3;
      break;
    case 'tertiary':
      // No changes for this education category
      break;
  }

  // BMI conditions
  switch (inputs.bmi) {
    case 'underweight':
      dementia_score += 6.5;
      stroke_score -= 3.5;
      mi_score += 5.5;
      diabetes_score -= 10;
      break;
    case 'normal weight':
      // No changes for this BMI category
      break;
    case 'overweight':
      dementia_score -= 1.5;
      mi_score += 4;
      diabetes_score += 8;
      break;
    case 'obese':
      dementia_score -= 6;
      stroke_score -= 1.5;
      mi_score += 4;
      diabetes_score += 19;
      break;
  }

  // Cholesterol conditions
  if (inputs.cholesterol === 'high') {
    dementia_score += 4.5;
    stroke_score += 2;
    mi_score -= 1;
    diabetes_score += 0.5;
  }

  // HDL conditions
  if (inputs.low_hdl === 'yes') {
    stroke_score -= 3.5;
    mi_score -= 1.5;
    diabetes_score -= 5;
  }

  // LDL conditions
  if (inputs.high_ldl === 'yes') {
    dementia_score -= 1.5;
    stroke_score += 4;
    mi_score += 4;
    diabetes_score -= 5.5;
  }

  // Diabetes conditions
  if (inputs.diabetes === 'yes') {
    dementia_score += 0.5;
    stroke_score += 3;
    mi_score += 5.5;
  }

  // High blood pressure conditions
  if (inputs.hbp === 'yes') {
    dementia_score -= 0.5;
    stroke_score += 4.5;
    mi_score += 2.5;
    diabetes_score += 5;
  }

  // TBI conditions
  if (inputs.tbi === 'yes') {
    dementia_score -= 0.5;
    stroke_score += 4;
    mi_score -= 2.5;
    diabetes_score += 2;
  }

  // Stroke conditions
  if (inputs.stroke === 'yes') {
    dementia_score += 10.5;
    mi_score += 5;
  }

  // Atrial fibrillation conditions
  if (inputs.afib === 'yes') {
    dementia_score += 2.5;
    stroke_score += 6;
    mi_score += 8;
  }

  // Heart attack conditions
  if (inputs.heartattack === 'yes') {
    dementia_score -= 3;
    stroke_score += 3.5;
  }

  // Hearing loss conditions
  if (inputs.hearing_loss === 'yes') {
    dementia_score += 2;
    stroke_score += 1;
    mi_score += 0.5;
    diabetes_score += 2.5;
  }

  // Sleep disturbances sum condition
  const sleepSum = inputs.falling_asleep + inputs.staying_asleep + inputs.waking_early +
    inputs.dissatisfaction + inputs.noticeable + inputs.worried + inputs.interfere;
  if (sleepSum > 15) {
    dementia_score -= 2.5;
    stroke_score += 1.5;
    mi_score += 6.5;
    diabetes_score += 0.5;
  }

  // Psychological conditions sum
  const psychSum = inputs.bothered + inputs.mind + inputs.depressed + inputs.effort +
    inputs.future + inputs.fearful + inputs.sleep + inputs.happy + inputs.lonely + inputs.going;
  if (psychSum > 8) {
    dementia_score += 1;
    stroke_score += 3.5;
    mi_score += 2;
    diabetes_score += 1;
  }

  // Physical activity sum
  const activitySum = inputs.vigorous + inputs.moderate + inputs.walk;
  if (activitySum > 500) {
    dementia_score += 4;
    stroke_score -= 0.5;
    mi_score += 1.5;
    diabetes_score -= 1.5;
  }

  // Social engagement score
  const socialEngagement = (inputs.newspaper + inputs.magazines + inputs.books + inputs.games +
    inputs.brain_training + inputs.emails + inputs.social_media + inputs.stimulating +
    inputs.other_freq + inputs.museum + inputs.concert + inputs.library) / 12;

  if (socialEngagement < 3) {
    dementia_score += 0;
  } else if (socialEngagement >= 3 && socialEngagement <= 4) {
    dementia_score += 0;
  } else if (socialEngagement > 4) {
    dementia_score -= 10.5;
  }

  // Social isolation sum
  const socialSum = inputs.companion + inputs.left_out + inputs.isolated;
  if (socialSum > 5) {
    dementia_score += 6.5;
    stroke_score += 5;
    mi_score += 5;
    diabetes_score += 0.5;
  }

  // Fruit and vegetable consumption
  if (inputs.fruitveg === 1) {
    dementia_score -= 2;
    stroke_score -= 5;
    mi_score += 6.5;
    diabetes_score += 2.5;
  }

  // Fish intake
  if (inputs.fish_intake === 1) {
    dementia_score += 1;
    mi_score -= 1;
    diabetes_score += 0.5;
  }

  // Alcohol conditions
  switch (inputs.alcohol) {
    case 0:
      break;
    case 1:
      dementia_score -= 5;
      stroke_score += 0.5;
      mi_score += 1;
      diabetes_score -= 5;
      break;
    case 2:
      dementia_score -= 5;
      mi_score += 4.5;
      diabetes_score -= 7;
      break;
  }

  // Smoking conditions
  switch (inputs.smoking) {
    case 'non-smoker':
      break;
    case 'current':
      dementia_score -= 2.5;
      stroke_score -= 1.5;
      mi_score += 2;
      diabetes_score += 2;
      break;
    case 'former':
      dementia_score += 2;
      mi_score -= 2;
      diabetes_score += 5.5;
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