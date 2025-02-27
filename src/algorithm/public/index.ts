import { Inputs, Scores } from "../types";
import { femaleAlgorithm } from "./femaleAlgorithm";
import { maleAlgorithm } from "./maleAlgorithm";
import { otherGenderAlgorithm } from "./otherGenderAlgorithm";

const MAX_SCORE = 48.25;
const IS_SAFE_SCORING = false;

export function publicScoring(inputs: Inputs): Scores {
  let scores: Scores = {
    dementia_score: 0,
    stroke_score: 0,
    mi_score: 0,
    diabetes_score: 0
  };

  switch (inputs.gender) {
    case "male":
      scores = maleAlgorithm(inputs);
      break;
    case "female":
      scores = femaleAlgorithm(inputs);
      break;
    case "other":
      scores = otherGenderAlgorithm(inputs);
      break;
  }

  if (IS_SAFE_SCORING) {
    for (const k in scores) {
      const key = k as keyof Scores;
      if (scores[key] < 0) {
        console.error(`Score for ${key} is less than 0. Setting to 0.`);
        scores[key] = 0;
      }
      if (scores[key] > MAX_SCORE) {
        console.error(`Score for ${key} is greater than max score (${MAX_SCORE}). Setting to ${MAX_SCORE}.`);
        scores[key] = MAX_SCORE;
      }
    }
  }
  return scores;
}