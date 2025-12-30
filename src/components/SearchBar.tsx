import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

interface SearchBarProps {
  apiUrl: string;
}

interface Suggestion {
  id: number;
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ apiUrl }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get<Suggestion[]>(`${apiUrl}?query=${query}`);
        setSuggestions(response.data);
      } catch (err) {
        setError('Failed to fetch suggestions');
      }
    };

    fetchSuggestions();
  }, [query, apiUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search"
      />
      {error && <div>{error}</div>}
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
