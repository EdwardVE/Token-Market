import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Elections from './pages/Elections';
import RegisterCandidate from './components/RegisterCandidate';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Elections/>} />
        <Route path='/RegisterCandidate' element={<RegisterCandidate/>} />
      </Routes>
    </Router>
  );
}

export default App;
