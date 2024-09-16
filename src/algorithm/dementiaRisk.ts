import { PersonData } from './types';
import { getAgePoints } from './helperFunctions';

export function calculateDementiaRisk(data: PersonData): number {
  let points = 0;
  const isMale = data.sex === 'Male';

  // Age
  points += getAgePoints(data.age, isMale ? [-8, 0, 11, 15, 25, 49] : [-9, 0, 8, 14, 24, 32]);

  // Education
  points += isMale ?
    (data.education === 'less than secondary' ? 7 : data.education === 'upper secondary' ? 4 : 0) :
    (data.education === 'less than secondary' ? 3 : data.education === 'upper secondary' ? 2 : 0);

  // Obesity
  points += isMale ?
    (data.obesity === 'underweight' ? 11 : data.obesity === 'Obese' ? -1 : 0) :
    (data.obesity === 'underweight' ? 2 : data.obesity === 'Overweight' ? -3 : data.obesity === 'Obese' ? -6 : 0);

  // Alcohol consumption
  points += isMale ?
    (data.alcoholConsumption === 'Moderate' ? -5 : data.alcoholConsumption === 'High' ? -1 : 0) :
    (data.alcoholConsumption === 'Moderate' ? -6 : data.alcoholConsumption === 'High' ? -9 : 0);

  // Smoking status
  points += isMale ?
    (data.smokingStatus === 'current smoker' ? -3 : 0) :
    (data.smokingStatus === 'current smoker' ? -2 : data.smokingStatus === 'former smoker' ? 4 : 0);

  // Other factors
  points += isMale ? 0 : (data.hypertension ? -1 : 0);
  points += data.cholesterol > 6.5 ? (isMale ? 4 : 5) : 0;
  points += data.depression ? (isMale ? -2 : 4) : 0;
  points += data.traumaticBrainInjury ? (isMale ? 0 : -1) : 0;
  points += data.loneliness ? (isMale ? 4 : 9) : 0;
  points += data.physicalActivity === 'Less than sufficient' ? (isMale ? 6 : 2) : 0;
  points += data.cognitiveActivity === 'Moderate' ? (isMale ? 1 : -1) : data.cognitiveActivity === 'High' ? (isMale ? -13 : -8) : 0;
  points += data.atrialFibrillation ? (isMale ? 3 : 2) : 0;
  points += data.sleepProblem ? (isMale ? 0 : -5) : 0;
  points += data.hearingLoss ? (isMale ? 4 : 0) : 0;
  points += data.diabetes ? (isMale ? 0 : 1) : 0;
  points += data.stroke ? (isMale ? 13 : 8) : 0;
  points += data.myocardialInfarction ? (isMale ? -4 : -2) : 0;
  points += data.hdl >= (isMale ? 1.0 : 1.3) ? (isMale ? 3 : -3) : 0;
  points += data.ldl >= 4.1 ? (isMale ? 2 : -5) : 0;
  points += data.fruitsAndVegetables === 'at least 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily' ? (isMale ? 0 : -4) : 0;
  points += data.fishServing === 'at least 2 serving per week' ? (isMale ? 2 : 0) : 0;

  return points;
}