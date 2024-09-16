import { PersonData } from './types';
import { getAgePoints } from './helperFunctions';

export function calculateMIRisk(data: PersonData): number {
  let points = 0;
  const isMale = data.sex === 'Male';

  // Age
  points += getAgePoints(data.age, isMale ? [3, 0, 3, 3, -2, 9] : [2, 0, 3, 1, 0, -2]);

  // Education
  points += isMale ?
    (data.education === 'upper secondary' ? -2 : 0) :
    (data.education === 'less than secondary' ? 4 : data.education === 'upper secondary' ? 5 : 0);

  // Obesity
  points += isMale ?
    (data.obesity === 'underweight' ? 12 : data.obesity === 'Overweight' ? 5 : data.obesity === 'Obese' ? 4 : 0) :
    (data.obesity === 'underweight' ? -1 : data.obesity === 'Overweight' ? 3 : data.obesity === 'Obese' ? 4 : 0);

  // Alcohol consumption
  points += isMale ?
    (data.alcoholConsumption === 'Moderate' ? 2 : 0) :
    (data.alcoholConsumption === 'High' ? 9 : 0);

  // Smoking status
  points += isMale ?
    (data.smokingStatus === 'current smoker' ? 3 : data.smokingStatus === 'former smoker' ? -2 : 0) :
    (data.smokingStatus === 'current smoker' ? 1 : data.smokingStatus === 'former smoker' ? -2 : 0);

  // Other factors
  points += data.hypertension ? (isMale ? 1 : 4) : 0;
  points += data.cholesterol > 6.5 ? (isMale ? -3 : 1) : 0;
  points += data.depression ? (isMale ? 5 : -1) : 0;
  points += data.traumaticBrainInjury ? (isMale ? 1 : -6) : 0;
  points += data.loneliness ? (isMale ? 5 : 1) : 0;
  points += data.physicalActivity === 'Less than sufficient' ? (isMale ? 1 : 2) : 0;
  points += data.atrialFibrillation ? (isMale ? 7 : 9) : 0;
  points += data.sleepProblem ? (isMale ? 10 : 3) : 0;
  points += data.hearingLoss ? (isMale ? -2 : 3) : 0;
  points += data.diabetes ? (isMale ? 5 : 6) : 0;
  points += data.stroke ? (isMale ? 3 : 7) : 0;
  points += data.hdl >= (isMale ? 1.0 : 1.3) ? (isMale ? -1 : -2) : 0;
  points += data.ldl >= 4.1 ? (isMale ? 7 : 1) : 0;
  points += data.fruitsAndVegetables === 'at least 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily' ? (isMale ? 11 : 2) : 0;
  points += data.fishServing === 'at least 2 serving per week' ? -1 : 0;

  return points;
}