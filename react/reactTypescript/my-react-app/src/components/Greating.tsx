// ! Step 1 for Code 1
// import React from "react";
// todo Use inline typing directly in the destructured props
// const Greeting = ({ name }: { name: string }) => {
//   return <div>Hello, {name}!</div>;
// };
// export default Greeting;

// ! Step 2 for Code 1
import React from "react";

// Step 1: Define the prop types using a TypeScript interface
interface GreetingProps {
  name: string; // 'name' must be a string
}

// Step 2: Use the interface in the function parameter
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
