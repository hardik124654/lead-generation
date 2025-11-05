
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Generating Leads...</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">The AI is searching for data. This may take a moment.</p>
  </div>
);
