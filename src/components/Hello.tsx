import React from 'react';

// Define the props type
interface HelloProps {
  name: string;
}

// Functional component with props
const Hello: React.FC<HelloProps> = ({ name }) => {
  // Error handling for invalid name input
  if (!name) {
    throw new Error('Name is required');
  }

  return (
    <div>
      {/* Display a greeting message */}
      <h1>Hello, {name}!</h1>
    </div>
  );
};

export default Hello;
