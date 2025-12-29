import React from 'react';

// Define the props type for the Hello component
interface HelloProps {
  name: string;
}

// A simple React functional component that greets the user
const Hello: React.FC<HelloProps> = ({ name }) => {
  if (!name) {
    // Error handling for missing name prop
    console.error('Name prop is required for Hello component');
    return <div>Error: Name is required</div>;
  }

  return <div>Hello, {name}!</div>;
};

export default Hello;
