import './App.css';
import Home from './components/Home';
import DebugLogic from './components/debugLogic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <code>Wordle-helper</code>
        </p>
        <Home />
        {/* <DebugLogic /> */}
      </header>
    </div>
  );
}

export default App;
