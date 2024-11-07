import { Inputs, Scores } from "../types";
import { femaleAlgorithm } from "./femaleAlgorithm";
import { maleAlgorithm } from "./maleAlgorithm";
import { otherGenderAlgorithm } from "./otherGenderAlgorithm";

export function GPScoring(inputs: Inputs): Scores {
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
  return scores;
}