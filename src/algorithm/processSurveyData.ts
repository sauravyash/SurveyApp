import { UnitDatum, YesNoInput } from "./helpers";
import { UnitData } from "./types";

export function getUnitAndValue(value: UnitData): UnitDatum[] {
  if (value && typeof value === 'object') {
    return Object.keys(value).map((unit) => ({
      unit,
      value: (value as Record<string, number>)[unit],
    }));
  }
  if (typeof value === 'number') return [{ unit: 'none', value }];
  return [{ unit: 'none', value: Number(value) }]; // may be NaN; callers should guard
}

export function categorizeGender(gender: string | unknown): 'male' | 'female' | 'other' {
  let g: string | undefined;
  if (typeof gender === 'string') g = gender;
  else if (gender && typeof (gender as any).currentKey === 'string') g = (gender as any).currentKey;

  g = (g ?? '').toLowerCase();
  return g === 'male' || g === 'female' ? (g as 'male' | 'female') : 'other';
}

export function categorizeAge(ageData: UnitData): string {
  const { value: age } = getUnitAndValue(ageData)[0] ?? { value: NaN };
  if (ageData == null || Number.isNaN(age)) return 'unknown';
  if (age >= 65 && age <= 69) return '65-69';
  if (age >= 70 && age <= 74) return '70-74';
  if (age >= 75 && age <= 79) return '75-79';
  if (age >= 80 && age <= 84) return '80-84';
  if (age >= 85 && age <= 89) return '85-89';
  if (age >= 90) return '90+';
  return '<64';
}

function stripQIfPresent(str: string) {
  if (/^q\d+:/.test(str)) {
    return str.replace(/^q\d+:\s*/, '');
  }
  return str;
}

export type EducationCategories = 'less than secondary' | 'upper secondary' | 'tertiary' | 'unknown';

export function categorizeEducation(education: string): EducationCategories {
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
  const weightParts = getUnitAndValue(weight);
  const { unit: hUnit, value: hValRaw } = getUnitAndValue(height)[0] ?? { unit: 'none', value: NaN };

  if (!Number.isFinite(hValRaw) || hValRaw <= 0) return 'unknown';

  // Height normalization to meters
  let hMeters = NaN;
  const u = (hUnit || '').toLowerCase();
  if (u === 'cm' || u === 'centimeter' || u === 'centimeters') hMeters = hValRaw / 100;
  else if (u === 'm' || u === 'meter' || u === 'meters') hMeters = hValRaw;
  else if (u === 'in' || u === 'inch' || u === 'inches') hMeters = hValRaw * 0.0254;
  else if (u === 'ft' || u === 'feet') hMeters = hValRaw * 0.3048;
  else hMeters = hValRaw; // fallback best-effort (assume meters)

  if (!Number.isFinite(hMeters) || hMeters <= 0) return 'unknown';

  // Weight normalization to kilograms
  let wKg = 0;
  for (const { unit, value } of weightParts) {
    const wu = (unit || '').toLowerCase();
    if (!Number.isFinite(value)) continue;
    if (wu === 'kg' || wu === 'kilogram' || wu === 'kilograms') wKg += value;
    else if (wu === 'lb' || wu === 'lbs' || wu === 'pound' || wu === 'pounds') wKg += value * 0.45359237;
    else if (wu === 'stone' || wu === 'st') wKg += value * 6.35029318;
    else wKg += value; // fallback assume kg
  }
  if (!Number.isFinite(wKg) || wKg <= 0) return 'unknown';

  const bmi = wKg / (hMeters * hMeters);

  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

export function categorizeCholesterol(totalCholesterol: UnitData, highCholesterol: string): 'high' | 'normal' {
  const { unit: tcUnit, value: tcValRaw } = getUnitAndValue(totalCholesterol)[0] ?? { unit: 'none', value: NaN };

  let flag: string | undefined;
  if (typeof highCholesterol === 'string') flag = highCholesterol;
  else if (highCholesterol && typeof (highCholesterol as any).currentKey === 'string') flag = (highCholesterol as any).currentKey;

  const flagNorm = (flag ?? '').toLowerCase();
  if (flagNorm === 'yes') return 'high';
  if (flagNorm === 'unsure' || flagNorm === "don't know" || flagNorm === 'dont know') return 'high'; // <-- conservative

  let tcMmol = Number(tcValRaw);
  const u = (tcUnit || '').toLowerCase();
  if (u === 'mg/dl' || u === 'mgdl') tcMmol = tcMmol / 38.67;

  if (Number.isFinite(tcMmol)) return tcMmol > 5.5 ? 'high' : 'normal';
  return 'high'; // also conservative fallback if no numeric value
}

// ---- HDL: ONLY check HDL (gender thresholds) ----
export function categorizeHDL(hdlData: UnitData, gender: string): 'yes' | 'no' {
  const { unit, value } = getUnitAndValue(hdlData)[0] ?? { unit: 'none', value: NaN };
  const g = categorizeGender(gender);

  if (!Number.isFinite(value)) return 'no'; // unknown → default 'no'

  const u = (unit || '').toLowerCase();
  if (u === 'mmol/l' || u === 'mmoll') {
    if (g === 'female') return value < 1.3 ? 'yes' : 'no';
    return value < 1.0 ? 'yes' : 'no';
  }
  if (u === 'mg/dl' || u === 'mgdl') {
    if (g === 'female') return value < 50 ? 'yes' : 'no';
    return value < 40 ? 'yes' : 'no';
  }
  // Unknown unit → assume mmol/L thresholds
  if (g === 'female') return value < 1.3 ? 'yes' : 'no';
  return value < 1.0 ? 'yes' : 'no';
}

export function categorizeLDL(ldlData: UnitData): 'yes' | 'no' {
  const { unit, value } = getUnitAndValue(ldlData)[0] ?? { unit: 'none', value: NaN };
  if (!Number.isFinite(value)) return 'no';

  const u = (unit || '').toLowerCase();
  if (u === 'mmol/l' || u === 'mmoll') return value >= 4.1 ? 'yes' : 'no'; // inclusive
  if (u === 'mg/dl' || u === 'mgdl') return value >= 160 ? 'yes' : 'no';   // inclusive

  // Unknown unit → assume mmol/L
  return value >= 4.1 ? 'yes' : 'no';
}


export function categorizeDiabetes(diabetes_diag: YesNoInput, glucose: YesNoInput): 'yes' | 'no' {
  return diabetes_diag === 'Yes' || glucose === 'Yes' ? 'yes' : 'no';
}

export function categorizeHBP(systolicData: UnitData, hbp_diag: YesNoInput, hbp_meds: YesNoInput): 'yes' | 'no' {
  const { value } = getUnitAndValue(systolicData)[0] ?? { value: NaN };
  if ((Number.isFinite(value) && value >= 140) || hbp_diag === 'Yes' || hbp_meds === 'Yes') return 'yes';
  return 'no';
}

export function categorizeTBI(tbi: string | undefined): 'yes' | 'no' {
  const s = (typeof tbi === 'string' ? tbi : (tbi as any)?.currentKey || '').toLowerCase();
  return /yes/.test(s) ? 'yes' : 'no';
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
  const hp = (hearing_problem ?? '').toLowerCase();
  const ha = (hearing_adequate ?? '').toLowerCase();

  if (
    hp.includes('prescribed hearing aids') || // covers wear / don’t wear
    ha.includes('serious problem') ||
    ha.includes('hearing is a problem') ||
    ha.includes('cannot hear speech in groups')
  ) {
    return 'yes';
  }
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
  if (!alco_freq) return 0; // safest for unknown → treat as 'never' per strict read
  const f = (typeof alco_freq === 'string' ? alco_freq : (alco_freq as any)?.currentKey || '').toLowerCase();
  const q = Number(alco_quant) || 0;

  if (f === 'never') return 0;
  if (f === 'monthly or less') return 1;
  if (f === '2-4 times a month') return q < 14 ? 1 : 2;
  if (f === '2-3 times a week') return q < 5 ? 1 : 2;
  if (f === '4+ times a week') return q < 4 ? 1 : 2;

  // Fallback: be conservative
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

export function calculateFruitVeg(
  _veg_freq: string, // ignore frequency per spec
  veg_serve_str: string,
  fruit_serve_str: string
): number {
  const veg_serve = parseInt(stripQIfPresent(veg_serve_str), 10);
  // fruit_serve_str may be like "2 serves", "6 or more", or "Don't know"
  const fs = (fruit_serve_str ?? '').trim();
  let fruit_serve = 0;
  if (/^\d+/.test(fs)) {
    fruit_serve = parseInt(fs, 10);
  } else if (/6\s*or\s*more/i.test(fs)) {
    fruit_serve = 6;
  } else {
    // Don't know / missing ⇒ treat as 0 per conservative read of your rule
    fruit_serve = 0;
  }

  if ((veg_serve === 3 || veg_serve === 4) && fruit_serve >= 2) return 1;
  return 0;
}


export function calculateFishIntake(fish_freq: string): number {
  if (["2-3 times per week", "4 or more times per week"].includes(fish_freq)) return 1;
  return 0;
}
