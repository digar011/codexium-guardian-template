import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchBar from './SearchBar';

jest.mock('axios');

describe('SearchBar Component', () => {
  it('renders input field', () => {
    render(<SearchBar apiUrl="/api/suggestions" />);
    const inputElement = screen.getByPlaceholderText(/search.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('fetches and displays suggestions', async () => {
    const suggestions = [{ id: 1, name: 'Suggestion 1' }, { id: 2, name: 'Suggestion 2' }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: suggestions });

    render(<SearchBar apiUrl="/api/suggestions" />);
    const inputElement = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(inputElement, { target: { value: 'Sug' } });

    await waitFor(() => {
      expect(screen.getByText('Suggestion 1')).toBeInTheDocument();
      expect(screen.getByText('Suggestion 2')).toBeInTheDocument();
    });
  });

  it('displays error on fetch failure', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch suggestions'));

    render(<SearchBar apiUrl="/api/suggestions" />);
    const inputElement = screen.getByPlaceholderText(/search.../i);
    fireEvent.change(inputElement, { target: { value: 'Sug' } });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch suggestions')).toBeInTheDocument();
    });
  });
});
