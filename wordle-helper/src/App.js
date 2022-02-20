import './App.css';
import Home from './components/Home';
import DebugLogic from './components/debugLogic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <code>Wordle-helper</code>
      </header>
      <div className="container">
        <div className="column">
        </div>
        <Home />
        <div className="column">
        </div>
      </div>
    </div>
  );
}

export default App;
