import { QuizResult, SurveyResult } from '../types';
import { STORAGE_KEY, SURVEY_STORAGE_KEY } from '../constants';

// --- Quiz Results ---

export const getResults = (): QuizResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load results", error);
    return [];
  }
};

export const saveResult = (result: QuizResult): void => {
  try {
    const currentResults = getResults();
    const newResults = [result, ...currentResults];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResults));
  } catch (error) {
    console.error("Failed to save result", error);
  }
};

export const clearResults = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SURVEY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear results", error);
  }
};

// --- Survey Results ---

export const getSurveys = (): SurveyResult[] => {
  try {
    const data = localStorage.getItem(SURVEY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load surveys", error);
    return [];
  }
};

export const saveSurvey = (survey: SurveyResult): void => {
  try {
    const currentSurveys = getSurveys();
    const newSurveys = [survey, ...currentSurveys];
    localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(newSurveys));
  } catch (error) {
    console.error("Failed to save survey", error);
  }
};