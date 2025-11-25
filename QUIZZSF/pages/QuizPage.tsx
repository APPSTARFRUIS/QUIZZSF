import React, { useState, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { Card, Button, Input } from '../components/UI';
import { QUESTION_LOGIC, LOGO_URL } from '../constants';
import { saveResult } from '../services/storageService';
import { v4 as uuidv4 } from 'uuid'; // Actually we will use simple random string to avoid adding heavy uuid lib if preferred, but let's use a simple generator function for simplicity
import { QuestionConfig } from '../types';
import { Survey } from '../components/Survey';

// Simple UUID generator to avoid dependencies
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const QuizPage: React.FC = () => {
  const { t, locale } = useLanguage();
  
  // Stages: 'intro' -> 'quiz' -> 'result'
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuizId, setCurrentQuizId] = useState<string | undefined>(undefined);

  const currentConfig: QuestionConfig = QUESTION_LOGIC[currentQuestionIndex];
  const questionKey = currentConfig ? currentConfig.id : 'q1';
  // @ts-ignore - Index signature fallback
  const currentQuestionText = t.questions[questionKey];

  const handleStart = () => {
    if (userName.trim().length > 0) {
      setStage('quiz');
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswers([]);
    }
  };

  const handleOptionToggle = (index: number) => {
    if (currentConfig.type === 'single') {
      setSelectedAnswers([index]);
    } else {
      setSelectedAnswers(prev => {
        if (prev.includes(index)) {
          return prev.filter(i => i !== index);
        } else {
          return [...prev, index];
        }
      });
    }
  };

  const handleNext = () => {
    // Calculate score for this question
    const isCorrect = validateAnswer(selectedAnswers, currentConfig.correctIndexes);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < QUESTION_LOGIC.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswers([]);
    } else {
      // Finish
      const finalScore = score + (isCorrect ? 1 : 0);
      const newId = generateId();
      setCurrentQuizId(newId);
      saveResult({
        id: newId,
        name: userName,
        score: finalScore,
        total: QUESTION_LOGIC.length,
        language: locale,
        createdAt: new Date().toISOString()
      });
      setScore(finalScore);
      setStage('result');
    }
  };

  const validateAnswer = (user: number[], correct: number[]) => {
    if (user.length !== correct.length) return false;
    const sortedUser = [...user].sort();
    const sortedCorrect = [...correct].sort();
    return sortedUser.every((value, index) => value === sortedCorrect[index]);
  };

  const getResultMessage = (score: number, total: number) => {
    const percentage = score / total;
    if (percentage < 0.4) return t.resultLow;
    if (percentage < 0.8) return t.resultMedium;
    return t.resultHigh;
  };

  const handleRetry = () => {
    setStage('intro');
    setUserName('');
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setCurrentQuizId(undefined);
  };

  // --- Renders ---

  if (stage === 'intro') {
    return (
      <div className="max-w-xl mx-auto w-full">
        <LanguageSelector />
        <Card className="text-center">
          <div className="flex justify-center mb-6">
             {/* Logo: Grand et propre */}
             <div className="h-40 w-40 rounded-full bg-white shadow-xl mx-auto flex items-center justify-center overflow-hidden">
                <img src={LOGO_URL} alt="Star Fruits" className="h-full w-full object-cover" />
             </div>
          </div>
          <h1 className="text-3xl font-bold text-star-dark mb-2">{t.appTitle}</h1>
          <p className="text-gray-600 mb-8">{t.appSubtitle}</p>
          
          <div className="text-left bg-star p-6 rounded-xl mb-8 text-white text-base shadow-md font-medium leading-relaxed">
            {t.introText}
          </div>

          <div className="space-y-6">
            <Input 
              label={t.nameLabel} 
              placeholder={t.namePlaceholder} 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            />
            <Button 
              fullWidth 
              onClick={handleStart} 
              disabled={!userName.trim()}
            >
              {t.startButton}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (stage === 'quiz') {
    const progress = ((currentQuestionIndex) / QUESTION_LOGIC.length) * 100;
    
    return (
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-4 flex justify-between items-center text-sm font-medium text-gray-500">
           <span>{t.questionsTitle} {currentQuestionIndex + 1} / {QUESTION_LOGIC.length}</span>
           <span className="text-star">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-star transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        <Card>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {currentQuestionText.text}
          </h2>
          {currentConfig.type === 'multiple' && (
            <p className="text-sm text-star font-medium mb-6 uppercase tracking-wider">
              {t.multipleChoiceNotice}
            </p>
          )}

          <div className="space-y-3 mb-8 mt-6">
            {currentQuestionText.options.map((option, idx) => {
              const isSelected = selectedAnswers.includes(idx);
              return (
                <div 
                  key={idx}
                  onClick={() => handleOptionToggle(idx)}
                  className={`p-4 rounded-lg border-2 cursor-pointer flex items-center gap-4 transition-all duration-200 ${
                    isSelected 
                      ? 'border-star bg-star-accent text-star-dark font-medium shadow-sm' 
                      : 'border-gray-100 hover:border-star/50 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-${currentConfig.type === 'single' ? 'full' : 'md'} border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-star bg-star' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={selectedAnswers.length === 0}
              className="min-w-[150px]"
            >
              {currentQuestionIndex === QUESTION_LOGIC.length - 1 ? t.finishButton : t.nextButton}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Result Stage
  return (
    <div className="max-w-xl mx-auto w-full pb-12">
      <Card className="relative overflow-hidden mb-8 text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-star"></div>
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-star-accent rounded-full flex items-center justify-center">
             <span className="text-4xl">🏆</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.resultTitle}</h2>
        <p className="text-lg text-gray-600 mb-8 font-medium">{userName}</p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{t.scoreLabel}</p>
          <div className="text-5xl font-extrabold text-star">
            {score} <span className="text-2xl text-gray-400">/ {QUESTION_LOGIC.length}</span>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-8 italic">
          "{getResultMessage(score, QUESTION_LOGIC.length)}"
        </p>

        <Button onClick={handleRetry} variant="secondary" fullWidth>
          {t.retryButton}
        </Button>
      </Card>

      {/* Bonus Survey */}
      <Survey quizId={currentQuizId} />
    </div>
  );
};