import React from 'react';
import PropTypes from 'prop-types';

// Define the types for the Badge component
interface BadgeProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  text: string;
}

// Badge component
const Badge: React.FC<BadgeProps> = ({ variant, text }) => {
  // Determine the class name based on the variant
  const getBadgeClass = (variant: BadgeProps['variant']): string => {
    switch (variant) {
      case 'primary':
        return 'badge-primary';
      case 'secondary':
        return 'badge-secondary';
      case 'success':
        return 'badge-success';
      case 'danger':
        return 'badge-danger';
      case 'warning':
        return 'badge-warning';
      default:
        return '';
    }
  };

  // Get the class name for the badge
  const badgeClass = getBadgeClass(variant);

  return (
    <span className={`badge ${badgeClass}`}>{text}</span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning']).isRequired,
  text: PropTypes.string.isRequired,
};

export default Badge;
