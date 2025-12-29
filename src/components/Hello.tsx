import React from 'react';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => {
  // Ensure the name prop is not empty
  if (!name) {
    console.error('Name prop is required');
    return <div>Error: Name is required</div>;
  }

  return <div>Hello, {name}!</div>;
};

export default Hello;