import './App.css';
import Home from './components/Home';
import DebugLogic from './components/debugLogic';
import ReactGA from 'react-ga4';

function App() {
  ReactGA.initialize('G-73CQT0J8E5');
  ReactGA.send('pageview');
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
