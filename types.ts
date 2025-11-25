export type SupportedLocale = 'fr' | 'en' | 'es' | 'it';

export interface QuestionConfig {
  id: string;
  type: 'single' | 'multiple';
  correctIndexes: number[];
}

export interface QuestionVariant {
  text: string;
  options: string[];
}

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  introText: string;
  nameLabel: string;
  namePlaceholder: string;
  startButton: string;
  validateButton: string;
  nextButton: string;
  finishButton: string;
  retryButton: string;
  questionsTitle: string;
  resultTitle: string;
  multipleChoiceNotice: string;
  
  // Messages résultats
  resultLow: string;
  resultMedium: string;
  resultHigh: string;
  scoreLabel: string;

  // Admin
  adminTitle: string;
  adminPasswordPlaceholder: string;
  adminLoginButton: string;
  adminTableName: string;
  adminTableScore: string;
  adminTableLanguage: string;
  adminTableDate: string;
  adminClearButton: string;
  adminExportButton: string;
  adminStatsTitle: string;
  adminTotalPart: string;
  adminAvgScore: string;
  adminBestScore: string;
  adminLoginError: string;
  adminNoData: string;
  adminTabQuiz: string;
  adminTabSurvey: string;

  // Survey
  surveyTitle: string;
  surveyIntro: string;
  surveySectionPortfolio: string;
  surveySectionTech: string;
  surveySectionComm: string;
  surveyLabelWhy: string;
  surveyLabelTechInfo: string;
  surveyLabelStrengths: string;
  surveyLabelSynergy: string;
  surveySubmit: string;
  surveySubmitted: string;
  
  surveyItemApple: string;
  surveyItemPear: string;
  surveyItemPeach: string;
  surveyItemApricot: string;
  surveyItemCherry: string;

  // Questions
  questions: {
    [key: string]: QuestionVariant;
  };
}

export interface QuizResult {
  id: string;
  name: string;
  score: number;
  total: number;
  language: SupportedLocale;
  createdAt: string;
}

export interface SurveyResult {
  id: string;
  quizId?: string; // Link to quiz result if available
  createdAt: string;
  ratings: {
    apple: number;
    pear: number;
    peach: number;
    apricot: number;
    cherry: number;
    techReactivity: number;
    commReactivity: number;
  };
  feedback: {
    techWhy: string;
    techInfoQuality: string;
    commWhy: string;
    strengthsWeaknesses: string;
    synergy: string;
  };
}