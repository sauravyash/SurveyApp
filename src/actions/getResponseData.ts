import axios from "axios";
import { BACKEND_URL } from "./constants";

export const getResponseData = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/get-survey-data`, {});
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
}