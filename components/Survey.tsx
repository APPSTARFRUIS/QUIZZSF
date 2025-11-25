import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button, Card, Input } from './UI';
import { SurveyResult } from '../types';
import { saveSurvey } from '../services/storageService';

// Star Rating Component (Internal)
const StarRating: React.FC<{ value: number; onChange: (val: number) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl transition-transform hover:scale-110 focus:outline-none ${
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export const Survey: React.FC<{ quizId?: string }> = ({ quizId }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const [ratings, setRatings] = useState({
    apple: 0,
    pear: 0,
    peach: 0,
    apricot: 0,
    cherry: 0,
    techReactivity: 0,
    commReactivity: 0,
  });

  const [feedback, setFeedback] = useState({
    techWhy: '',
    techInfoQuality: '',
    commWhy: '',
    strengthsWeaknesses: '',
    synergy: '',
  });

  const handleChangeFeedback = (field: keyof typeof feedback, value: string) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleRating = (field: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const surveyData: SurveyResult = {
      id: Math.random().toString(36).substr(2, 9),
      quizId,
      createdAt: new Date().toISOString(),
      ratings,
      feedback
    };
    saveSurvey(surveyData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="mt-8 bg-green-50 border border-green-200">
        <div className="text-center text-green-800 font-semibold py-4">
          {t.surveySubmitted}
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-8 border-t-4 border-star-light">
      <h3 className="text-xl font-bold text-star mb-2">{t.surveyTitle}</h3>
      <p className="text-sm text-gray-500 mb-6">{t.surveyIntro}</p>

      {/* 1. Portfolio */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4 pb-2 border-b">{t.surveySectionPortfolio}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {[
            { key: 'apple', label: t.surveyItemApple },
            { key: 'pear', label: t.surveyItemPear },
            { key: 'peach', label: t.surveyItemPeach },
            { key: 'apricot', label: t.surveyItemApricot },
            { key: 'cherry', label: t.surveyItemCherry },
          ].map((item) => (
            <div key={item.key} className="flex justify-between items-center">
              <span className="text-gray-700">{item.label}</span>
              {/* @ts-ignore */}
              <StarRating value={ratings[item.key]} onChange={(v) => handleRating(item.key as any, v)} />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Technical Reactivity */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-800">{t.surveySectionTech}</h4>
          <StarRating value={ratings.techReactivity} onChange={(v) => handleRating('techReactivity', v)} />
        </div>
        <div className="space-y-3">
          <Input 
            placeholder={t.surveyLabelWhy} 
            value={feedback.techWhy}
            onChange={(e) => handleChangeFeedback('techWhy', e.target.value)}
          />
           <Input 
            placeholder={t.surveyLabelTechInfo} 
            value={feedback.techInfoQuality}
            onChange={(e) => handleChangeFeedback('techInfoQuality', e.target.value)}
          />
        </div>
      </div>

      {/* 3. Commercial Reactivity */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-800">{t.surveySectionComm}</h4>
          <StarRating value={ratings.commReactivity} onChange={(v) => handleRating('commReactivity', v)} />
        </div>
        <div className="space-y-3">
           <Input 
            placeholder={t.surveyLabelWhy} 
            value={feedback.commWhy}
            onChange={(e) => handleChangeFeedback('commWhy', e.target.value)}
          />
        </div>
      </div>

      {/* 4. Open Ended */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t.surveyLabelStrengths}</label>
          <textarea 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-star focus:ring-2 focus:ring-star/20 outline-none transition-all h-24 resize-none"
            value={feedback.strengthsWeaknesses}
            onChange={(e) => handleChangeFeedback('strengthsWeaknesses', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">{t.surveyLabelSynergy}</label>
          <textarea 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-star focus:ring-2 focus:ring-star/20 outline-none transition-all h-24 resize-none"
            value={feedback.synergy}
            onChange={(e) => handleChangeFeedback('synergy', e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleSubmit} fullWidth>
        {t.surveySubmit}
      </Button>
    </Card>
  );
};