import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Badge from './Badge';

// Test the Badge component

describe('Badge Component', () => {
  it('renders the correct text', () => {
    render(<Badge variant="primary" text="New" />);
    const badgeElement = screen.getByText(/New/i);
    expect(badgeElement).toBeInTheDocument();
  });

  it('applies the correct class for primary variant', () => {
    render(<Badge variant="primary" text="Primary" />);
    const badgeElement = screen.getByText(/Primary/i);
    expect(badgeElement).toHaveClass('badge-primary');
  });

  it('applies the correct class for secondary variant', () => {
    render(<Badge variant="secondary" text="Secondary" />);
    const badgeElement = screen.getByText(/Secondary/i);
    expect(badgeElement).toHaveClass('badge-secondary');
  });

  it('applies the correct class for success variant', () => {
    render(<Badge variant="success" text="Success" />);
    const badgeElement = screen.getByText(/Success/i);
    expect(badgeElement).toHaveClass('badge-success');
  });

  it('applies the correct class for danger variant', () => {
    render(<Badge variant="danger" text="Danger" />);
    const badgeElement = screen.getByText(/Danger/i);
    expect(badgeElement).toHaveClass('badge-danger');
  });

  it('applies the correct class for warning variant', () => {
    render(<Badge variant="warning" text="Warning" />);
    const badgeElement = screen.getByText(/Warning/i);
    expect(badgeElement).toHaveClass('badge-warning');
  });
});
