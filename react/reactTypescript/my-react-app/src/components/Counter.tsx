// //! Step 1: Code 2
// import React, { Component } from "react";

// class Counter extends Component< { count: number }> {
// todo Initial state with inline typing already handled above in Component<{}, { count: number }>
//   state = {
//     count: 0,
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };

//   render() {
//     return (
//       <div>
//         <p>Count: {this.state.count}</p>
//         <button onClick={this.increment}>Increment</button>
//       </div>
//     );
//   }
// }

// export default Counter;

// ! Step 2: Code 2
import React, { Component } from "react";

// Step 1: Define the type of state
type CounterState = {
  count: number;
};

// Step 2: Extend the Component class with props and state types
// Record<string, never> = no props allowed
class Counter extends Component<Record<string, never>, CounterState> {
  // Step 3: Define the initial state
  state: CounterState = {
    count: 0,
  };

  // Step 4: Method to update state
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // Step 5: Render method to return JSX
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
