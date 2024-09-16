export interface PersonData {
  sex: 'Male' | 'Female';
  age: number;
  education: 'less than secondary' | 'upper secondary' | 'Tertiary';
  obesity: 'underweight' | 'Normal weight' | 'Overweight' | 'Obese';
  alcoholConsumption: 'Low' | 'Moderate' | 'High';
  smokingStatus: 'Non-smoker' | 'current smoker' | 'former smoker';
  hypertension: boolean;
  cholesterol: number;
  depression: boolean;
  traumaticBrainInjury: boolean;
  loneliness: boolean;
  physicalActivity: 'sufficient' | 'Less than sufficient';
  cognitiveActivity: 'Low' | 'Moderate' | 'High';
  atrialFibrillation: boolean;
  sleepProblem: boolean;
  hearingLoss: boolean;
  diabetes: boolean;
  stroke: boolean;
  myocardialInfarction: boolean;
  hdl: number;
  ldl: number;
  fruitsAndVegetables: 'less than 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily' | 'at least 5 servings of vegetables or 3 servings of vegetables and 2 fruits daily';
  fishServing: 'Less than 2 serving per week' | 'at least 2 serving per week';
}