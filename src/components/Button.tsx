import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, disabled, children }) => {
  const buttonClasses = classNames(
    'px-4 py-2 font-semibold rounded',
    {
      'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary' && !disabled,
      'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary' && !disabled,
      'bg-blue-300 text-white cursor-not-allowed': variant === 'primary' && disabled,
      'bg-gray-300 text-white cursor-not-allowed': variant === 'secondary' && disabled,
    }
  );

  // Return a button element
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;