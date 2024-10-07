import axios from "axios";
import { OutputResult } from "../algorithm/calculateScores";

const API_URL = ENV_VAR_BACKEND_URL as string;

export const generateReport = async (data: OutputResult) => {
  try {
    console.log("backend URL:", API_URL);
    const res = await axios.post(`${API_URL}/generate-report`, data);
    return res;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}