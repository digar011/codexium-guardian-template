import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, disabled = false, children }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    try {
      onClick();
    } catch (error) {
      console.error('Error occurred while clicking the button:', error);
    }
  };

  const getClassNames = (): string => {
    switch (variant) {
      case 'primary':
        return 'button-primary';
      case 'secondary':
        return 'button-secondary';
      default:
        return '';
    }
  };

  return (
    <button
      className={`button ${getClassNames()}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
