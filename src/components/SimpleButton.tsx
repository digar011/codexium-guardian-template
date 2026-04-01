import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@shadcn/ui';

interface SimpleButtonProps {
  label: string;
  onClick: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ label, onClick }) => {
  return (
    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick} data-testid="simple-button">
      {label}
    </Button>
  );
};

SimpleButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SimpleButton;