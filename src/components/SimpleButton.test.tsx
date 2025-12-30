import { render, screen, fireEvent } from '@testing-library/react';
import SimpleButton from './SimpleButton';

describe('SimpleButton', () => {
  it('renders correctly', () => {
    render(<SimpleButton label="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByTestId('simple-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click me');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<SimpleButton label="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByTestId('simple-button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});