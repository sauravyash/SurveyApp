import axios from "axios";
import { OutputResult } from "../algorithm/types";

const API_URL = import.meta.env.VITE_SURVEY_BACKEND_URL //ENV_VAR_BACKEND_URL as string;

export const generateReport = async (personal: {}, data: OutputResult ) => {
  try {
    const res = await axios.post(`${API_URL}/generate-report`, {data, personal});
    return res;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}