import './App.css';
import "phaser";
import Game                            from "./game/Game";
import {GameStateProvider}             from "./game/state";
import {PhaserProvider}                from "./game/phaser";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PhaserProvider>
        <GameStateProvider>
          <div className="App">
            <header className="App-header">
              <Game/>
            </header>
          </div>
        </GameStateProvider>
      </PhaserProvider>
    </ThemeProvider>
  );
}

export default App;
