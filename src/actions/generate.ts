import axios from "axios";

const API_URL = ENV_VAR_BACKEND_URL as string;

export interface GenerateReportRequestBody {
  cogDriskScore: number;
  dateOfAssessment: string;
  demographicFactors: string[];
  medicalRiskFactors: string[];
  lifestyleHabits: string[];
  recommendations: {
    category: string;
    status: string;
    details: string;
    recommendations: string;
  }[];
}

export const generateReport = async (data: GenerateReportRequestBody) => {
  try {
    const res = await axios.post(`${API_URL}/generate-report`, data);
    return res;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}