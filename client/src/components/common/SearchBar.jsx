import { useState } from 'react';

export default function SearchBar({
  placeholder = 'Search destinations, experiences...',
  onSearch,
  className = '',
  large = false,
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative group ${className}`}
    >
      <div
        className={`relative flex items-center transition-all duration-500 ${
          large ? 'h-16' : 'h-12'
        } ${
          focused
            ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/20'
            : 'shadow-card hover:shadow-card-hover'
        } bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700`}
      >
        <div className={`flex items-center justify-center ${large ? 'w-16' : 'w-12'} text-gray-400 group-hover:text-primary-500 transition-colors`}>
          <svg className={`${large ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`flex-1 h-full bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            large ? 'text-lg' : 'text-sm'
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              if (onSearch) onSearch('');
            }}
            className="p-2 mr-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className={`${
            large ? 'h-12 px-8 mx-2' : 'h-9 px-5 mx-1.5'
          } bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
