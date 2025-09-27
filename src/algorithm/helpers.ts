export const clampNum = (x: unknown, min = 0, max = Number.POSITIVE_INFINITY): number => {
  const v = typeof x === 'number' ? x : Number(x);
  if (!Number.isFinite(v)) return 0;
  return Math.min(Math.max(v, min), max);
};

export type BinaryYN = 'yes' | 'no' | 'unknown';

export const isYes = (v: BinaryYN): boolean => v === 'yes';

export const isNo = (val: BinaryYN): boolean => val === 'no';

export type Gender = 'male' | 'female' | 'other';

export type AgeCat =
  | '65-69' | '70-74' | '75-79' | '80-84' | '85-89' | '90+' | 'unknown';

export type EduCat =
  | 'less than secondary' | 'upper secondary' | 'tertiary' | 'unknown';

export type BMI =
  | 'underweight' | 'normal weight' | 'overweight' | 'obese' | 'unknown';

export type Cholesterol = 'high' | 'normal' | 'unknown';
export type Alcohol = 0 | 1 | 2;
export type Smoking = 'non-smoker' | 'current' | 'former';

export type UnitDatum = { unit: string; value: number };
export type UnitData = number | string | null | undefined | Record<string, number>; // keep your existing shape


export type YesNoInput = "Yes" | "No" | "Don’t know";