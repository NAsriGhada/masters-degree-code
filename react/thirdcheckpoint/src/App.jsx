import Player from "./components/Player";
import PlayersList from "./components/PlayersList";

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-4">Football Stars</h1>
      <PlayersList />
      {/* Test for default props */}
      <Player/>
    </div>
  );
}

export default App;
