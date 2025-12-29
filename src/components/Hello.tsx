import React from 'react';

type HelloProps = {
  name: string;
};

const Hello: React.FC<HelloProps> = ({ name }) => {
  // Simple component to display a greeting message
  try {
    if (!name) {
      throw new Error('Name is required');
    }
    return <div>Hello, {name}!</div>;
  } catch (error) {
    console.error('Error rendering Hello component:', error);
    return <div>Error: {error.message}</div>;
  }
};

export default Hello;
