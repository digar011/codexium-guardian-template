import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', onClick, disabled = false, children }) => {
  // Define button class based on variant
  const buttonClass = classNames('button', {
    'button--primary': variant === 'primary',
    'button--secondary': variant === 'secondary',
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} aria-disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;