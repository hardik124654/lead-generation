import React, { useState, useCallback } from 'react';
import { Lead } from './types';
import { generateLeads } from './services/geminiService';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { LeadsTable } from './components/LeadsTable';
import { ExportButton } from './components/ExportButton';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [searchSubject, setSearchSubject] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(10);
  const [category, setCategory] = useState<string>('Any');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLeads = useCallback(async () => {
    if (!searchSubject.trim()) {
      setError('Please enter a search subject.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLeads([]);

    try {
      const generatedLeads = await generateLeads(searchSubject, quantity, category);
      setLeads(generatedLeads);
    } catch (err: any) {
      console.error('Error generating leads:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchSubject, quantity, category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">Generate Business Leads with AI</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter a subject, select a category, and choose the number of leads to find company details.
            </p>
            <SearchForm
              searchSubject={searchSubject}
              setSearchSubject={setSearchSubject}
              quantity={quantity}
              setQuantity={setQuantity}
              category={category}
              setCategory={setCategory}
              onGenerate={handleGenerateLeads}
              isLoading={isLoading}
            />
          </div>

          <div className="px-6 md:px-8 pb-8">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            
            {!isLoading && leads.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Collected Leads</h3>
                  <ExportButton leads={leads} subject={searchSubject} />
                </div>
                <LeadsTable leads={leads} />
              </>
            )}

            {!isLoading && !error && leads.length === 0 && (
                 <div className="text-center py-10 px-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No leads generated yet</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter a subject and click "Generate Leads" to begin.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;