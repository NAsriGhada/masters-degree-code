// src/App.js
import "./App.css";
import UserList from "./UserList";

function App() {
  return (
    <main className="container">
      <header>
        <h1>User Directory</h1>
        <p className="muted">JSONPlaceholder → Axios → React Hooks</p>
      </header>

      <UserList />
    </main>
  );
}

export default App;
