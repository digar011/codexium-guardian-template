import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('renders correctly with image and title', () => {
    render(<Card imageSrc="test.jpg" title="Test Title" />);
    const image = screen.getByRole('img');
    const title = screen.getByText('Test Title');
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Title');
  });

  test('handles missing props gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Card imageSrc="" title="" />);
    expect(consoleSpy).toHaveBeenCalledWith('Card component requires both imageSrc and title props.');
    consoleSpy.mockRestore();
  });
});
