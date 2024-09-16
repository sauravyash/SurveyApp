import { PersonData } from './types';
import { getAgePoints } from './helperFunctions';

export function calculateDiabetesRisk(data: PersonData): number {
  let points = 0;
  const isMale = data.sex === 'Male';

  // Age
  points += getAgePoints(data.age, isMale ? [5, 0, 1, -8, -7, -7] : [3, 0, -5, -9, -21, -21]);

  // Education
  points += isMale ?
    (data.education === 'less than secondary' ? 1 : data.education === 'upper secondary' ? 1 : 0) :
    (data.education === 'less than secondary' ? 10 : data.education === 'upper secondary' ? 5 : 0);

  // Obesity
  points += isMale ?
    (data.obesity === 'Overweight' ? 12 : data.obesity === 'Obese' ? 20 : 0) :
    (data.obesity === 'underweight' ? -10 : data.obesity === 'Overweight' ? 4 : data.obesity === 'Obese' ? 18 : 0);

  // Alcohol consumption
  points += isMale ?
    (data.alcoholConsumption === 'Moderate' ? -4 : data.alcoholConsumption === 'High' ? -1 : 0) :
    (data.alcoholConsumption === 'Moderate' ? -6 : data.alcoholConsumption === 'High' ? -13 : 0);

  // Smoking status
  points += isMale ?
    (data.smokingStatus === 'current smoker' ? 1 : data.smokingStatus === 'former smoker' ? 3 : 0) :
    (data.smokingStatus === 'current smoker' ? 3 : data.smokingStatus === 'former smoker' ? 8 : 0);

  // Other factors
  points += data.hypertension ? (isMale ? 4 : 6) : 0;
  points += data.cholesterol > 6.5 ? (isMale ? 6 : -5) : 0;
  points += data.depression ? (isMale ? -1 : 3) : 0;
  points += data.traumaticBrainInjury ? (isMale ? 0 : 4) : 0;
  points += data.loneliness ? (isMale ? -2 : 3) : 0;
  points += data.physicalActivity === 'Less than sufficient' ? (isMale ? -2 : -1) : 0;
  points += data.atrialFibrillation ? 0 : 0;
  points += data.sleepProblem ? (isMale ? 3 : -2) : 0;
  points += data.hearingLoss ? (isMale ? 1 : 4) : 0;
  points += data.hdl >= (isMale ? 1.0 : 1.3) ? (isMale ? -4 : -6) : 0;
  points += data.ldl >= 4.1 ? (isMale ? -8 : -3) : 0;
  points += data.fruitsAndVegetables === 'at least 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily' ? (isMale ? 1 : 4) : 0;
  points += data.fishServing === 'at least 2 serving per week' ? (isMale ? 0 : 1) : 0;

  return points;
}