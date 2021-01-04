import './App.css';
import "phaser";
import Game                from "./game/Game";
import {GameStateProvider} from "./game/state";
import {PhaserProvider}    from "./game/phaser";

function App() {
  return (
    <PhaserProvider>
      <GameStateProvider>
        <div className="App">
          <header className="App-header">
            <Game/>
          </header>
        </div>
      </GameStateProvider>
    </PhaserProvider>
  );
}

export default App;
