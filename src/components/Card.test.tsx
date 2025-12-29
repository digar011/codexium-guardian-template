import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Component', () => {
  it('renders title and description', () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    render(<Card title="Test Title" description="Test Description" imageUrl="/test.jpg" />);
    expect(screen.getByAltText('Test Title')).toHaveAttribute('src', '/test.jpg');
  });

  it('does not render image when imageUrl is not provided', () => {
    render(<Card title="Test Title" description="Test Description" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});