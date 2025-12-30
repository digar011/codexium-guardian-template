import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

const mockFetchSuggestions = jest.fn((query) => {
  if (query === 'error') {
    return Promise.reject('API Error');
  }
  return Promise.resolve([`${query} suggestion 1`, `${query} suggestion 2`]);
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    mockFetchSuggestions.mockClear();
  });

  it('renders input field', () => {
    render(<SearchBar fetchSuggestions={mockFetchSuggestions} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('fetches and displays suggestions', async () => {
    render(<SearchBar fetchSuggestions={mockFetchSuggestions} />);
    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(mockFetchSuggestions).toHaveBeenCalledWith('test'));
    expect(await screen.findByText('test suggestion 1')).toBeInTheDocument();
    expect(screen.getByText('test suggestion 2')).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    render(<SearchBar fetchSuggestions={mockFetchSuggestions} />);
    const input = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: 'error' } });

    await waitFor(() => expect(screen.getByText('Failed to fetch suggestions')).toBeInTheDocument());
    expect(screen.queryByText('error suggestion 1')).not.toBeInTheDocument();
  });
});
