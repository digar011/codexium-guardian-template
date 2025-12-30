import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import SearchBar from './SearchBar';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

const suggestions = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' }
];

mockAxios.get.mockResolvedValue({ data: suggestions });

describe('SearchBar Component', () => {
  test('renders without crashing', () => {
    render(<SearchBar url="/api/suggestions" />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('fetches and displays suggestions', async () => {
    render(<SearchBar url="/api/suggestions" />);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'a' } });

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/api/suggestions?q=a');
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  test('displays error on fetch failure', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('Network error'));

    render(<SearchBar url="/api/suggestions" />);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'a' } });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch suggestions')).toBeInTheDocument();
    });
  });
});
