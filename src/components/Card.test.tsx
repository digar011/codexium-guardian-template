import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Component', () => {
  test('renders title and description', () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders image when imageUrl is provided', () => {
    const testImageUrl = 'https://via.placeholder.com/150';
    render(<Card title="Test Title" description="Test Description" imageUrl={testImageUrl} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', testImageUrl);
    expect(image).toHaveAttribute('alt', 'Test Title');
  });

  test('does not render image when imageUrl is not provided', () => {
    render(<Card title="Test Title" description="Test Description" />);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(0);
  });
});
