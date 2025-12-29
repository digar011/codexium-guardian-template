import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Button component with primary and secondary variants.
 * @param {ButtonProps} props - Component properties.
 * @returns {JSX.Element} - Rendered button element.
 */
const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick, disabled = false }) => {
  // Determine button class based on variant
  const buttonClass = clsx('button', {
    'button--primary': variant === 'primary',
    'button--secondary': variant === 'secondary',
  });

  // Handle button click with optional error handling
  const handleClick = () => {
    try {
      if (onClick && !disabled) {
        onClick();
      }
    } catch (error) {
      console.error('Error handling button click:', error);
    }
  };

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;