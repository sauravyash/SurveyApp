import axios from "axios";
import { BACKEND_URL, endpoint, stage } from "./constants";


export const sendConsentData = async (email: string) => {
  try {
    console.log(endpoint, stage, import.meta.env);
    
    
    const res = await axios.post(
      `${BACKEND_URL}/send-consent-form`,
      { email }
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};
