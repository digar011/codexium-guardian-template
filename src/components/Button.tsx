import React from 'react';
import PropTypes from 'prop-types';
import { Button as ShadcnButton } from 'shadcn/ui';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <ShadcnButton
      data-testid="button-component"
      className={`btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </ShadcnButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Button;