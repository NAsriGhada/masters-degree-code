import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import "./App.css";


function App() {
  return (
    <div>
      <h1>📝 Redux ToDo App</h1>
      <AddTask />
      <ListTask />
    </div>
  );
}

export default App;
