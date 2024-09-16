import { PersonData } from './types';
import { getAgePoints } from './helperFunctions';

export function calculateStrokeRisk(data: PersonData): number {
  let points = 0;
  const isMale = data.sex === 'Male';

  // Age
  points += getAgePoints(data.age, isMale ? [-2, 0, 2, 4, -5, -6] : [0, 0, 4, 2, 0, -15]);

  // Education
  points += isMale ?
    (data.education === 'less than secondary' ? -1 : data.education === 'upper secondary' ? 1 : 0) :
    (data.education === 'less than secondary' ? 4 : data.education === 'upper secondary' ? 2 : 0);

  // Obesity
  points += isMale ?
    (data.obesity === 'underweight' ? -1 : data.obesity === 'Overweight' ? 1 : data.obesity === 'Obese' ? 0 : 0) :
    (data.obesity === 'underweight' ? -6 : data.obesity === 'Overweight' ? -2 : data.obesity === 'Obese' ? -4 : 0);

  // Alcohol consumption
  points += isMale ?
    (data.alcoholConsumption === 'Moderate' ? 2 : data.alcoholConsumption === 'High' ? 3 : 0) :
    (data.alcoholConsumption === 'Moderate' ? -1 : data.alcoholConsumption === 'High' ? -3 : 0);

  // Smoking status
  points += isMale ?
    (data.smokingStatus === 'current smoker' ? -2 : data.smokingStatus === 'former smoker' ? -3 : 0) :
    (data.smokingStatus === 'current smoker' ? -2 : data.smokingStatus === 'former smoker' ? 3 : 0);

  // Other factors
  points += data.hypertension ? (isMale ? 4 : 5) : 0;
  points += data.cholesterol > 6.5 ? (isMale ? 6 : -2) : 0;
  points += data.depression ? (isMale ? 7 : 0) : 0;
  points += data.traumaticBrainInjury ? (isMale ? 2 : 6) : 0;
  points += data.loneliness ? (isMale ? 5 : 0) : 0;
  points += data.physicalActivity === 'Less than sufficient' ? (isMale ? 0 : -1) : 0;
  points += data.atrialFibrillation ? (isMale ? 5 : 7) : 0;
  points += data.sleepProblem ? (isMale ? 5 : -2) : 0;
  points += data.hearingLoss ? (isMale ? 0 : 2) : 0;
  points += data.diabetes ? 3 : 0;
  points += data.myocardialInfarction ? (isMale ? 3 : 4) : 0;
  points += data.hdl >= (isMale ? 1.0 : 1.3) ? -4 : 0;
  points += data.ldl >= 4.1 ? (isMale ? 1 : 5) : 0;
  points += data.fruitsAndVegetables === 'at least 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily' ? -6 : 0;
  points += data.fishServing === 'at least 2 serving per week' ? 0 : 0;

  return points;
}