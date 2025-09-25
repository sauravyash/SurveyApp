export const endpoint = process.env.VITE_SURVEY_BACKEND_URL as string || "";
export const stage = import.meta.env.mode || "dev";
export const BACKEND_URL = `https://${endpoint}/${stage}`