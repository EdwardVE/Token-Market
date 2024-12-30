import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PeraWalletConnectComponent from './components/PeraWalletConnectComponent';
import TutorialPeraWallet from './pages/TutorialPeraWallet';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PeraWalletConnectComponent />} />
        <Route path="/Tutorial" element={<TutorialPeraWallet/>} />
      </Routes>
    </Router>
  );
}

export default App;
