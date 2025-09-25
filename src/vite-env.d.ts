/// <reference types="vite/client" />
declare module "*.md";
declare const process: {
  env: {
    "VITE_SURVEY_BACKEND_URL": string,
  }
};