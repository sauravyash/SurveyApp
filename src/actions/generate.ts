import axios from "axios";
import { OutputResult } from "../algorithm/types";
import { BACKEND_URL } from "./constants";

export const generateReport = async (personal: {}, data: OutputResult ) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/generate-report`, {data, personal});
    return res;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}