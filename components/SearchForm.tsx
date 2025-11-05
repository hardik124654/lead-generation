import React from 'react';

interface SearchFormProps {
  searchSubject: string;
  setSearchSubject: (value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  category: string;
  setCategory: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const categories = [
    'Any', 
    'Chemical', 
    'Pharma'
];

export const SearchForm: React.FC<SearchFormProps> = ({ 
    searchSubject, setSearchSubject, 
    quantity, setQuantity, 
    category, setCategory,
    onGenerate, isLoading 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-3">
      <div className="flex flex-col sm:flex-row flex-grow gap-3">
        <div className="flex-grow">
          <label htmlFor="search-subject" className="sr-only">Search Subject</label>
          <input
            id="search-subject"
            type="text"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
            placeholder="e.g., pharma companies in new jersey"
            className="w-full h-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            disabled={isLoading}
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="category" className="sr-only">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
            className="w-full h-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex-shrink-0">
          <label htmlFor="quantity" className="sr-only">Number of leads</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (e.target.value === '') {
                  setQuantity(1);
                  return;
                }
                if (!isNaN(val)) {
                    setQuantity(Math.max(1, val));
                }
            }}
            min="1"
            className="w-24 h-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-center"
            disabled={isLoading}
            aria-label="Number of leads"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex-grow sm:flex-grow-0 md:w-auto flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Leads'
          )}
        </button>
      </div>
    </form>
  );
};
