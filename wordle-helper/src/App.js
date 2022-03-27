import './App.css';
import Home from './components/Home';
import DebugLogic from './components/debugLogic';
import ReactGA from 'react-ga4';

function App() {
  if (window?.location?.hostname !== 'localhost') {// prevents sending events on local development
    ReactGA.initialize('G-73CQT0J8E5');
    ReactGA.send('pageview');
  }
  return (
    <div className="App">
      <header>
        <h1>
          <code>Wordle-helper</code>
        </h1>
        </header>
        <main role={'main'}>
          <Home />
        </main>
      {/* <footer role="contentinfo">
       // TODO
      </footer> */}
        {/* <DebugLogic /> */}
    </div>
  )
}

export default App;