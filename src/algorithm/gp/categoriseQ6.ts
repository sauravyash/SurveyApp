export interface Q6Result {
  diabetes: boolean;
  hbp: boolean;           // covers both "with meds" and "no meds"
  highCholesterol: boolean;
  tbi: boolean;           // head injury
  stroke: boolean;        // stroke/TIA
  afib: boolean;
  heartattack: boolean;   // myocardial infarction
  depression: boolean;    // clinical depression
  // If you also want “none of the above” as a flag, add it too
  none: boolean;
}

/**
 * Parses the user’s selections from Q6 (multiple-choice) and returns 
 * a Q6Result with booleans for each condition.
 * 
 * @param selectedOptions  The array/string[] of answers chosen by the user for Q6.
 */
export function categoriseQ6(selectedOptions: string[]): Q6Result {  
  // You could normalize the strings or guard if Q6 is empty
  if (!selectedOptions || selectedOptions.length === 0) {
    return {
      diabetes: false,
      hbp: false,
      highCholesterol: false,
      tbi: false,
      stroke: false,
      afib: false,
      heartattack: false,
      depression: false,
      none: false,
    };
  }

  const result: Q6Result = {
    diabetes: false,
    hbp: false,
    highCholesterol: false,
    tbi: false,
    stroke: false,
    afib: false,
    heartattack: false,
    depression: false,
    none: false,
  };

  // 1) Diabetes / high blood glucose => diabetes = true
  if (
    selectedOptions.includes("Diabetes") ||
    selectedOptions.includes("High blood glucose (sugar) OR fasting glucose above 7mmol/L")
  ) {
    result.diabetes = true;
  }

  // 2) HBP with meds or without => hbp = true
  if (
    selectedOptions.includes("High blood pressure but taking medications for controlling blood pressure") ||
    selectedOptions.includes("High blood pressure but not taking any medications")
  ) {
    result.hbp = true;
  }

  // 3) High cholesterol  
  if (
    selectedOptions.includes("High cholesterol levels in the past 2 years, or your cholesterol level is higher")
  ) {
    result.highCholesterol = true;
  }

  // 4) Head injury => tbi = true
  if (selectedOptions.includes("Head injury")) {
    result.tbi = true;
  }

  // 5) Stroke or TIA
  if (selectedOptions.includes("Stroke or TIA (transient ischemic attack)")) {
    result.stroke = true;
  }

  // 6) Atrial fibrillation
  if (selectedOptions.includes("Atrial fibrillation")) {
    result.afib = true;
  }

  // 7) Heart attack / myocardial infarction
  if (selectedOptions.includes("Heart attack or myocardial infarction")) {
    result.heartattack = true;
  }

  // 8) Clinical depression
  if (selectedOptions.includes("Clinical depression")) {
    result.depression = true;
  }

  // 9) None of the above
  if (selectedOptions.includes("None of the above")) {
    result.none = true;
  }

  return result;
}
