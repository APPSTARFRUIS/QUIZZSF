import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, Button, Input } from '../components/UI';
import { getResults, getSurveys, clearResults } from '../services/storageService';
import { ADMIN_PASSWORD } from '../constants';
import { QuizResult, SurveyResult } from '../types';

export const AdminPage: React.FC = () => {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'quiz' | 'survey'>('quiz');
  const [refreshKey, setRefreshKey] = useState(0); 

  // Read data
  const results = useMemo(() => getResults(), [refreshKey, isAuthenticated]);
  const surveys = useMemo(() => getSurveys(), [refreshKey, isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(t.adminLoginError);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete ALL data (quiz + surveys)?')) {
      clearResults();
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleExport = () => {
    let csvContent = "";
    let filename = "";

    if (activeTab === 'quiz') {
      filename = "star_fruits_quiz_results.csv";
      // Headers
      const headers = [t.adminTableName, t.adminTableScore, "Total", t.adminTableLanguage, t.adminTableDate].join(",");
      const rows = results.map(r => {
        const date = new Date(r.createdAt).toLocaleString();
        // Escape quotes if necessary
        const name = `"${r.name.replace(/"/g, '""')}"`;
        return `${name},${r.score},${r.total},${r.language},"${date}"`;
      }).join("\n");
      csvContent = headers + "\n" + rows;

    } else {
      filename = "star_fruits_survey_results.csv";
      // Headers
      const headers = [
        "Date", "Apple", "Pear", "Peach", "Apricot", "Cherry",
        "Tech Reactivity", "Tech Why", "Tech Info",
        "Comm Reactivity", "Comm Why",
        "Qualities/Defects", "Synergy"
      ].join(",");

      const rows = surveys.map(s => {
         const date = new Date(s.createdAt).toLocaleString();
         const escape = (str: string) => `"${(str || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

         return [
           `"${date}"`,
           s.ratings.apple, s.ratings.pear, s.ratings.peach, s.ratings.apricot, s.ratings.cherry,
           s.ratings.techReactivity, escape(s.feedback.techWhy), escape(s.feedback.techInfoQuality),
           s.ratings.commReactivity, escape(s.feedback.commWhy),
           escape(s.feedback.strengthsWeaknesses), escape(s.feedback.synergy)
         ].join(",");
      }).join("\n");
      csvContent = headers + "\n" + rows;
    }

    // Download using Blob with BOM for Excel compatibility (UTF-8)
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Stats
  const stats = useMemo(() => {
    if (results.length === 0) return null;
    const total = results.length;
    const avg = results.reduce((acc, curr) => acc + curr.score, 0) / total;
    const best = Math.max(...results.map(r => r.score));
    return { total, avg: avg.toFixed(1), best };
  }, [results]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto w-full">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-6 text-star-dark">{t.adminTitle}</h2>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder={t.adminPasswordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button fullWidth onClick={handleLogin}>
              {t.adminLoginButton}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-star-dark">{t.adminTitle}</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport} disabled={activeTab === 'quiz' ? results.length === 0 : surveys.length === 0} className="text-sm px-4 py-2">
            {t.adminExportButton}
          </Button>
          <Button variant="danger" onClick={handleClear} disabled={results.length === 0 && surveys.length === 0} className="text-sm px-4 py-2">
            {t.adminClearButton}
          </Button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center !p-4">
             <div className="text-gray-500 text-sm uppercase">{t.adminTotalPart}</div>
             <div className="text-3xl font-bold text-star">{stats.total}</div>
          </Card>
          <Card className="text-center !p-4">
             <div className="text-gray-500 text-sm uppercase">{t.adminAvgScore}</div>
             <div className="text-3xl font-bold text-blue-600">{stats.avg}</div>
          </Card>
          <Card className="text-center !p-4">
             <div className="text-gray-500 text-sm uppercase">{t.adminBestScore}</div>
             <div className="text-3xl font-bold text-amber-500">{stats.best}</div>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'quiz' ? 'border-b-2 border-star text-star' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('quiz')}
        >
          {t.adminTabQuiz}
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'survey' ? 'border-b-2 border-star text-star' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('survey')}
        >
          {t.adminTabSurvey} ({surveys.length})
        </button>
      </div>

      <Card className="overflow-hidden !p-0">
        {activeTab === 'quiz' ? (
          results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">{t.adminNoData}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold">{t.adminTableName}</th>
                    <th className="p-4 font-semibold">{t.adminTableScore}</th>
                    <th className="p-4 font-semibold">{t.adminTableLanguage}</th>
                    <th className="p-4 font-semibold">{t.adminTableDate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">{result.name}</td>
                      <td className="p-4 font-bold text-star">{result.score} / {result.total}</td>
                      <td className="p-4 uppercase text-xs">
                        <span className="px-2 py-1 bg-gray-200 rounded-md">{result.language}</span>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(result.createdAt).toLocaleDateString(undefined, {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Survey Tab */
          surveys.length === 0 ? (
             <div className="p-8 text-center text-gray-500">{t.adminNoData}</div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                      <th className="p-3 font-semibold w-24">Date</th>
                      <th className="p-3 font-semibold">Ratings (A/P/Pe/Ap/C)</th>
                      <th className="p-3 font-semibold">Tech (R/Why/Info)</th>
                      <th className="p-3 font-semibold">Comm (R/Why)</th>
                      <th className="p-3 font-semibold">Qual/Def & Synergy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                    {surveys.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                         <td className="p-3 whitespace-nowrap text-gray-500">
                            {new Date(s.createdAt).toLocaleDateString(undefined, {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                         </td>
                         <td className="p-3">
                           <div className="flex gap-1 text-[10px] font-mono">
                             <span title="Apple" className="bg-red-100 px-1 rounded">A:{s.ratings.apple}</span>
                             <span title="Pear" className="bg-green-100 px-1 rounded">P:{s.ratings.pear}</span>
                             <span title="Peach" className="bg-orange-100 px-1 rounded">Pe:{s.ratings.peach}</span>
                             <span title="Apricot" className="bg-yellow-100 px-1 rounded">Ap:{s.ratings.apricot}</span>
                             <span title="Cherry" className="bg-red-200 px-1 rounded">C:{s.ratings.cherry}</span>
                           </div>
                         </td>
                         <td className="p-3 max-w-xs">
                           <div className="font-bold mb-1">Score: {s.ratings.techReactivity}/5</div>
                           {s.feedback.techWhy && <div className="italic text-gray-500 mb-1">"{s.feedback.techWhy}"</div>}
                           {s.feedback.techInfoQuality && <div>Info: {s.feedback.techInfoQuality}</div>}
                         </td>
                         <td className="p-3 max-w-xs">
                           <div className="font-bold mb-1">Score: {s.ratings.commReactivity}/5</div>
                           {s.feedback.commWhy && <div className="italic text-gray-500">"{s.feedback.commWhy}"</div>}
                         </td>
                         <td className="p-3 max-w-xs">
                           {s.feedback.strengthsWeaknesses && (
                             <div className="mb-2">
                               <strong className="block text-gray-900">Q&D:</strong>
                               {s.feedback.strengthsWeaknesses}
                             </div>
                           )}
                           {s.feedback.synergy && (
                             <div>
                               <strong className="block text-gray-900">Synergy:</strong>
                               {s.feedback.synergy}
                             </div>
                           )}
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          )
        )}
      </Card>
    </div>
  );
};