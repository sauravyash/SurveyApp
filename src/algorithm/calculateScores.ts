// import { sampleData } from './sample_data.ts';

import { Inputs, OutputResult, Scores } from './types';
import { publicScoring } from './public/index.ts';
import { IS_SURVEY_TYPE_GP } from '../resources/questions/QuestionBanks/index.ts';
import { mapPublicDataInputs } from './public/mapDataInputs.ts';
import { GPScoring } from './gp/index.ts';
import { mapGPDataInputs  } from './gp/mapDataInputs.ts';

export function processSurveyResponse(data: Record<string, any>): { scores: Scores, inputs: Inputs } {
  
  const inputs: Inputs = IS_SURVEY_TYPE_GP ? mapGPDataInputs(data) : mapPublicDataInputs(data);

  const res: OutputResult = {
    scores: {
      dementia_score: 0,
      stroke_score: 0,
      mi_score: 0,
      diabetes_score: 0
    },
    inputs
  };
  if (IS_SURVEY_TYPE_GP) {
    res.scores = GPScoring(inputs);    
  } else {
    res.scores = publicScoring(inputs);
  }
  return res;
}

// Export the function to be used in the main file    
export default processSurveyResponse;

