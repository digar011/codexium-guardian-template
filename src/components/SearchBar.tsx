import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchBarProps {
  placeholder?: string;
  url: string;
}

interface Suggestion {
  id: number;
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', url }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch suggestions based on user input
  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${url}?q=${query}`);
        setSuggestions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch suggestions');
        console.error(err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounce);
  }, [query, url]);

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
      />
      {error && <div className="error">{error}</div>}
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
