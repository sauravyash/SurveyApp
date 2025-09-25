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

export function categorizeGender(gender: string | unknown): ('male' | 'female' | 'other') {
  if (typeof gender !== 'string') {
    gender = ((gender as any).currentKey as string);
    if (!gender) return 'other';
  }

  gender = (gender as string).toLowerCase();
  if (gender === 'male' || gender === 'female') return gender;
  return 'other';
}

export function categorizeAge(ageData: UnitData): string {
  const age = getUnitAndValue(ageData)[0].value;
  if (!ageData || isNaN(age)) return 'unknown';
  if (age > 64 && age < 70) return '65-69';
  if (age > 69 && age < 75) return '70-74';
  if (age > 74 && age < 80) return '75-79';
  if (age > 79 && age < 85) return '80-84';
  if (age > 84 && age < 90) return '85-89';
  if (age > 89) return '90+';
  return '<64';
}

function stripQIfPresent(str: string) {
  if (/^q\d+:/.test(str)) {
    return str.replace(/^q\d+:\s*/, '');
  }
  return str;
}
export function categorizeEducation(education: string): string {
  education = stripQIfPresent(education);

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

  if (!heightData || heightData.value === undefined) {
    console.info("Height data is undefined:", heightData);
    return 'unknown';
  }
  if (!weightData || weightData.length === 0) {
    console.info("Weight data is undefined:", weightData);
    return 'unknown';
  }

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
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
}

export function categorizeCholesterol(totalCholesterol: UnitData, highCholesterol: string): 'high' | 'normal' {
  const totalCholesterolData = getUnitAndValue(totalCholesterol)[0].value;
  if (highCholesterol === undefined || highCholesterol === null) {
    console.error("High cholesterol is undefined or null:", highCholesterol);
    return 'high';
  }
  if (typeof highCholesterol !== 'string') {
    highCholesterol = (highCholesterol as any).currentKey;
    if (!highCholesterol) return 'high';
  }

  if (totalCholesterolData > 5.5 || highCholesterol.toLowerCase() === 'yes') return 'high';
  return 'normal';
}

export function categorizeHDL(hdlData: UnitData, ldlData: UnitData, gender: string): 'yes' | 'no' {
  const { value: ldlValue, unit: ldlUnit } = getUnitAndValue(ldlData)[0];
  const { value: hdlValue, unit: hdlUnit } = getUnitAndValue(hdlData)[0];  

  if (ldlUnit === "mmol/L" && ldlValue > 4.1) return 'yes';
  if (ldlUnit === "mg/dL" && ldlValue > 160) return 'yes';

  if (gender === 'female') {
    if (hdlUnit === "mmol/L" && hdlValue < 1.3) return 'yes';
    if (hdlUnit === "mg/dL" && hdlValue < 50) return 'yes';
  } else {
    if (hdlUnit === "mmol/L" && hdlValue < 1.0) return 'yes';
    if (hdlUnit === "mg/dL" && hdlValue < 40) return 'yes';
  }

  return 'no';
}

export function categorizeLDL(ldlData: UnitData, hdlData: UnitData, gender: string): 'yes' | 'no' {
  const { value: ldlValue, unit: ldlUnit } = getUnitAndValue(ldlData)[0];
  const { value: hdlValue, unit: hdlUnit } = getUnitAndValue(hdlData)[0];

  if (gender === 'female') {
    if (hdlUnit === "mmol/L" && hdlValue < 1.3) return 'yes';
    if (hdlUnit === "mg/dL" && hdlValue < 50) return 'yes';
  } else {
    if (hdlUnit === "mmol/L" && hdlValue < 1.0) return 'yes';
    if (hdlUnit === "mg/dL" && hdlValue < 40) return 'yes';
  }

  if (ldlUnit === "mmol/L" && ldlValue > 4.1) return 'yes';
  if (ldlUnit === "mg/dL" && ldlValue > 160) return 'yes';
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
  if (typeof tbi !== 'string') {
    tbi = (tbi as any).currentKey;
    if (!tbi) return 'no';
  }
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
const satisfied = ["Very Satisfied", "Satisfied", "Moderately Satisfied", "Dissatisfied", "Very Dissatisfied"];
const noticable = ["Not at all Noticeable", "A Little", "Somewhat", "Much", "Very Much Noticeable"];
const worried = ["Not at all Worried", "A Little", "Somewhat", "Much", "Very Much Worried"];
const interfering = ["Not at all Interfering", "A Little", "Somewhat", "Much", "Very Much Interfering"];
const common = [
  "Rarely or none of the time (less than 1 day)",
  "Some or a little of the time (1-2 days)",
  "Occasionally or a moderate amount of time (3-4 days)",
  "Most or all of the time (5-7 days)"
];
const companionship = ["Don't Know", "Hardly ever", "Some of the time", "Often"];
const frequency = [
  "Don’t know",
  "Once a year or less",
  "Several times a year",
  "Several times a month",
  "Several times a week",
  "Every day or almost everyday",
];

type mapTypes = "common" | "companionship" | "sleep" | "satisfied" | "noticable" | "worried" | "interfering" | "frequency";

const SAFETY_VALUE = 0;
export function categoryMapper(mapType: mapTypes, level: string | Set<string>): number {
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

  if (level instanceof Set) {
    level = Array.from(level)[0].split(": ")[1];
  }


  const map = mapList[mapType].map((v, i) => ({ [v]: i })).reduce((acc, curr) => ({
    ...acc,
    ...curr
  }), {} as Record<string, number>);

  // console.log(mapType, level, map[level]);

  return map[level] ?? SAFETY_VALUE;
}

export function categorizePesticides(pesticide_exposure: "Yes" | "No" | "Don't know") {
  if (!pesticide_exposure || !["Yes", "No", "Don't know"].includes(pesticide_exposure)) return "Don't know";
  return pesticide_exposure;
}

export function categorizeSmoking(smokeStatus: string): 'current' | 'non-smoker' | 'former' {
  if (!smokeStatus) return 'non-smoker';
  // console.log(smokeStatus);
  if (typeof smokeStatus !== 'string') {
    smokeStatus = (smokeStatus as any).currentKey;
    if (!smokeStatus) return 'non-smoker';
  }

  smokeStatus = smokeStatus.toLowerCase();
  if (smokeStatus === 'yes, currently') return 'current';
  if (smokeStatus === 'yes, not currently') return 'former';
  // if (smokeStatus === 'never') 
  return 'non-smoker';
}

export function categorizeAlcohol(alco_freq: string, alco_quant: number): number {
  if (alco_freq === undefined || alco_freq === null) {
    console.info("Alcohol frequency is undefined or null:", alco_freq);
    return 1;
  }

  if (typeof alco_freq !== 'string') {
    alco_freq = (alco_freq as any).currentKey;
    if (!alco_freq) return 1;
  }

  alco_freq = alco_freq.toLowerCase();
  const alco_freq_map: { [key: string]: number } = {
    "never": 0,
    "monthly or less": 1,
    "2-4 times a month": 2,
    "2-3 times a week": 3,
    "4+ times a week": 4,
  };

  const alco_freq_num = alco_freq_map[alco_freq];
  if (alco_freq_num === 0) return 0;
  if (alco_freq_num === 1 && alco_quant < 14) return 1;
  if (alco_freq_num > 1 && alco_freq_num < 4 && alco_quant < 5) return 1;
  if (alco_freq_num > 3 && alco_quant < 4) return 1;

  if (alco_freq_num === 1 && alco_quant >= 14) return 2;
  if (alco_freq_num > 1 && alco_freq_num < 4 && alco_quant >= 5) return 2;
  if (alco_freq_num > 3 && alco_quant >= 4) return 2;

  return 2;
}

export function calculateExercise(daysData: { "days per week": number } | "unsure", time: { "hours": number, "minutes": number } | "unsure" | undefined): number {
  let [days, hours, minutes] = [0, 0, 0];

  if (daysData === undefined || daysData === null) {
    days = 0;
    console.error("Days data is undefined or null:", daysData);
  } else if (daysData === "unsure") {
    days = 0;
  } else {
    days = daysData["days per week"];
  }

  if (!time || time === "unsure") {
    hours = 0;
    minutes = 0;
  } else {
    hours = time["hours"] || 0;
    minutes = time["minutes"] || 0;
  }
  const score = days * ((hours * 60) + minutes);
  return score;
}

export function calculateFruitVeg(veg_freq: string, veg_serve_str: string, fruit_serve_str: string): number {

  const fruit_serve_parsed = fruit_serve_str && fruit_serve_str.substring(0, 1) || "D";
  const veg_serve = parseInt(stripQIfPresent(veg_serve_str));
  const fruit_serve = fruit_serve_parsed === "D" ? 0 : parseInt(fruit_serve_parsed);

  if (veg_freq === "Every day") {
    if (veg_serve < 3) {
      return 0;
    }
    if (veg_serve > 4) {
      return 1;
    }
    if ((veg_serve === 4 || veg_serve === 3) && fruit_serve > 1) {
      return 1;
    }
  }

  return 0;
}

export function calculateFishIntake(fish_freq: string): number {
  if (["2-3 times per week", "4 or more times per week"].includes(fish_freq)) return 1;
  return 0;
}
