import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/MainComponent';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  return (
    <Router>
      <Main></Main>
    </Router>
  );
}

export default App;
