import './App.css';
import "phaser";
import Game                            from "./game/Game";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Game/>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
