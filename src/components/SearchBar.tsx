import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  fetchSuggestions: (query: string) => Promise<string[]>;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 2) return;

    const fetchResults = async () => {
      try {
        const results = await fetchSuggestions(query);
        setSuggestions(results);
        setError(null);
      } catch (err) {
        setError('Failed to fetch suggestions');
        setSuggestions([]);
      }
    };

    fetchResults();
  }, [query, fetchSuggestions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {error && <div className="error">{error}</div>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
