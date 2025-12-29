import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from './Tooltip';

describe('Tooltip Component', () => {
  test('renders the children correctly', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('shows tooltip text on hover', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const button = screen.getByText('Hover me');
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  test('hides tooltip text when not hovered', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    const button = screen.getByText('Hover me');
    fireEvent.mouseLeave(button);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });
});
