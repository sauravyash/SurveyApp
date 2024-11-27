import { UnitData } from "./types";

export function getUnitAndValue(value: UnitData): { unit: string, value: any }[] {
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).map(unit => ({
      unit,
      value: value[unit]
    }));
  }

  return [{
    unit: "none",
    value: value
  }];
}

export function categorizeGender(gender: string): ('male' | 'female' | 'other') {
  gender = gender.toLowerCase();
  if (gender === 'male' || gender === 'female') return gender;
  return 'other';
}

export function categorizeAge(ageData: UnitData): string {
  const age = getUnitAndValue(ageData)[0].value;
  if (isNaN(age)) return 'unknown';
  if (age > 64 && age < 70) return '65-69';
  if (age > 69 && age < 75) return '70-74';
  if (age > 74 && age < 80) return '75-79';
  if (age > 79 && age < 85) return '80-84';
  if (age > 84 && age < 90) return '85-89';
  if (age > 89) return '90+';
  return '<64';
}

export function categorizeEducation(education: string): string {
  if (["Partially completed primary/elementary school (or equivalent)",
    "Completed primary/elementary school (or equivalent)"].includes(education)) return 'less than secondary';
  if (["School certificate (Year 10) (or equivalent)",
    "Higher school certificate (Year 12) (or equivalent)"].includes(education)) return 'upper secondary';
  if (["Trade certificate/apprenticeship",
    "Technician’s certificate/advanced certificate",
    "Certificate other than above",
    "Associate diploma",
    "Undergraduate diploma",
    "Bachelor’s degree",
    "Post graduate diploma/certificate",
    "Higher degree"].includes(education)) return 'tertiary';
  return 'unknown';
}

export function calculateBMI(weight: UnitData, height: UnitData): string {
  const weightData = getUnitAndValue(weight);
  const heightData = getUnitAndValue(height)[0];
  const normalisedHeight = heightData.unit === 'cm' ? heightData.value / 100 : heightData.value * 0.0254;

  let normalisedWeight = 0;

  if (weightData[0].unit === 'kg') {
    normalisedWeight = weightData[0].value;
  } else if (weightData[0].unit === 'lb') {
    normalisedWeight = weightData[0].value * 2.205;
  } else if (["stone", "pounds"].includes(weightData[0].unit)) {
    weightData.forEach(({ unit, value }) => {
      if (unit === 'stone') {
        normalisedWeight += value * 6.35;
      }
      if (unit === 'pounds') {
        normalisedWeight += value * 2.205;
      }
    });
  }

  const bmi = normalisedWeight / (normalisedHeight * normalisedHeight);

  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 25) return 'normal weight';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
}

export function categorizeCholesterol(totalCholesterol: UnitData, highCholesterol: string): 'high' | 'normal' {
  const totalCholesterolData = getUnitAndValue(totalCholesterol)[0].value;
  if (totalCholesterolData > 5.5 || highCholesterol.toLowerCase() === 'yes') return 'high';
  return 'normal';
}

export function categorizeHDL(gender: string, hdlData: UnitData): 'yes' | 'no' {
  const hdl = getUnitAndValue(hdlData)[0].value;
  if ((gender === 'male' || gender === 'other') && (hdl < 1.0 || hdl < 40)) return 'yes';
  if (gender === 'female' && (hdl < 1.3 || hdl < 50)) return 'yes';
  return 'no';
}

export function categorizeLDL(ldlData: UnitData): 'yes' | 'no' {
  const ldl = getUnitAndValue(ldlData)[0].value;
  if (ldl > 4.1 || ldl > 160) return 'yes';
  return 'no';
}

type YesNoInput = "Yes" | "No" | "Don’t know";

export function categorizeDiabetes(diabetes_diag: YesNoInput, glucose: YesNoInput): 'yes' | 'no' {
  return diabetes_diag === 'Yes' || glucose === 'Yes' ? 'yes' : 'no';
}

export function categorizeHBP(systolicData: UnitData, hbp_diag: YesNoInput, hbp_meds: YesNoInput): 'yes' | 'no' {
  const systolic = getUnitAndValue(systolicData)[0].value;
  if (systolic > 140 || hbp_diag === 'Yes' || hbp_meds === 'Yes') return 'yes';
  return 'no';
}

export function categorizeTBI(tbi: string | undefined): 'yes' | 'no' {
  if (!tbi) return 'no';
  if (tbi.includes("Yes")) return 'yes';
  return 'no';
}

export function categorizeStroke(stroke_diag: string): 'yes' | 'no' {
  if (stroke_diag === 'Yes') return 'yes';
  return 'no';
}

export function categorizeAFib(atrialfib: string): 'yes' | 'no' {
  return ["Atrial fibrillation with stroke", "Atrial fibrillation without stroke"].includes(atrialfib) ? 'yes' : 'no';
}

export function categorizeHeartAttack(heartattack_diag: string): 'yes' | 'no' {
  return heartattack_diag === 'Yes' ? 'yes' : 'no';
}

export function categorizeHearingLoss(hearing_problem: string, hearing_adequate: string): 'yes' | 'no' {
  if ([
    "Yes, I was prescribed hearing aids/implant and wear them",
    "Yes, I was prescribed hearing aids but do not wear them"
  ].includes(hearing_problem)) return 'yes';
  if (hearing_adequate === "Cannot hear speech in groups.") return 'yes';
  return 'no';
}

const sleep = ["None", "Mild", "Moderate", "Severe", "Very Severe"];
const satisfied = ["Very satisfied", "Satisfied", "Moderately Satisfied", "Dissatisfied", "Very Dissatisfied"];
const noticable = ["Not at all Noticeable", "A Little", "Somewhat", "Much", "Very Much Noticeable"];
const worried = ["Not at all Worried", "A Little", "Somewhat", "Much", "Very Much Worried"];
const interfering = ["Not at all Interfering", "A Little", "Somewhat", "Much", "Very Much Interfering"];
const common = [
  "Rarely or none of the time (less than 1 day)",
  "Some or a little of the time (1-2 days)",
  "Occasionally or a moderate amount of time (3-4 days)",
  "Most or all of the time (5-7 days)"
];
const companionship = ["Hardly ever", "Some of the time", "Often"];
const frequency = [
  "Don’t know", 
  "Once a year or less", 
  "Several times a year", 
  "Several times a month", 
  "Several times a week",
  "Every day or almost everyday",
];

type mapType = "common" | "companionship" | "sleep" | "satisfied" | "noticable" | "worried" | "interfering" | "frequency";

export function categoryMapper(mapType: mapType, level: string): number {
  const mapList: Record<string, string[]> = {
    "sleep": sleep,
    "satisfied": satisfied,
    "noticable": noticable,
    "worried": worried,
    "interfering": interfering,
    "common": common,
    "frequency": frequency,
    "companionship": companionship,
  };

  const map = mapList[mapType].map((v, i) => ({ [v]: i })).reduce((acc, curr) => ({
    ...acc,
    ...curr
  }), {} as Record<string, number>);
  return map[level] ?? NaN;
}

export function categorizeSmoking(smokeStatus: string): 'current' | 'non-smoker' | 'former' {
  smokeStatus = smokeStatus.toLowerCase();
  if (smokeStatus === 'yes currently') return 'current';
  if (smokeStatus === 'yes, not currently') return 'former';
  // if (smokeStatus === 'never') 
  return 'non-smoker';
}

export function categorizeAlcohol(alco_freq: string, alco_quant: number): number {
  alco_freq = alco_freq.toLowerCase();
  if (alco_freq === 'never') return 0;
  if (alco_freq === 'monthly or less') return 1;
  if (alco_freq === '2-4 times a month' && alco_quant < 14) return 1;
  if (alco_freq === '2-3 times a week' && alco_quant < 5) return 1;
  if (alco_freq === '4+ times a week' && alco_quant < 4) return 1;
  if (alco_freq === '2-4 times a month' && alco_quant >= 14) return 2;
  if (alco_freq === '2-3 times a week' && alco_quant > 5) return 2;
  if (alco_freq === '4+ times a week' && alco_quant > 4) return 2;
  return 2;
}

export function calculateExercise(daysData: {"days per week": number} | "unsure", time: {"hours": number, "minutes": number} | "unsure" | undefined): number {
  let [days, hours, minutes] = [0, 0, 0];
  if (daysData === "unsure") {
    days = 0;
  } else {
    days = daysData["days per week"];
  }
  
  if (!time || time === "unsure") {
    hours = 0;
    minutes = 0;
  } else {
    hours = time["hours"];
    minutes = time["minutes"];
  }

  return days * ((hours * 60) + minutes);
}

export function calculateFruitVeg(veg_freq: number | string, veg_serve: number, fruit_serve: number): number {
  if (typeof veg_freq === 'number' && veg_serve < 3) return 0;
  if (typeof veg_freq === 'number' && veg_freq > 4) return 1;
  if ((veg_serve === 3 || veg_serve === 4) && (fruit_serve > 1)) return 1;

  if (typeof veg_freq === 'string') {
    veg_freq = veg_freq.toLowerCase();
    if (veg_freq === "not_everyday") return 0;
  }

  return 0;
}

export function calculateFishIntake(fish_freq: string): number {
  if (["2-3 times per week", "4 or more times per week"].includes(fish_freq)) return 1;
  return 0;
}
