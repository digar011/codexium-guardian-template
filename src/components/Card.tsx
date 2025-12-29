import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
  if (!imageSrc || !title) {
    console.error('Card component requires both imageSrc and title props.');
    return null;
  }

  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
    </div>
  );
};

export default Card;
