import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuizPage } from './pages/QuizPage';
import { AdminPage } from './pages/AdminPage';
import { LOGO_URL } from './constants';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'quiz' | 'admin'>('quiz');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-star text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-3">
            {/* Logo avec liseré blanc pour contraste sur fond vert */}
            <div className="h-12 w-12 rounded-full bg-white p-0.5 shadow-md flex-shrink-0">
               <img src={LOGO_URL} alt="Star Fruits" className="h-full w-full rounded-full object-cover" />
            </div>
            <span className="hidden sm:inline">SSL Star Fruits</span>
          </div>
          <div className="flex gap-1 bg-star-dark/30 p-1 rounded-lg">
            <button 
              onClick={() => setCurrentTab('quiz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentTab === 'quiz' ? 'bg-white text-star shadow' : 'text-white/80 hover:text-white hover:bg-star-light'
              }`}
            >
              Quiz
            </button>
            <button 
              onClick={() => setCurrentTab('admin')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentTab === 'admin' ? 'bg-white text-star shadow' : 'text-white/80 hover:text-white hover:bg-star-light'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 flex items-start justify-center pt-8 md:pt-12">
        {currentTab === 'quiz' ? <QuizPage /> : <AdminPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Star Fruits. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;