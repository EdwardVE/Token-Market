import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TokenDetail from './pages/TokenDetail';
import SellToken from './pages/SellToken';
import Header from './components/Header';
import PeraWalletConnectComponent from './components/PeraWalletConnectComponent';
import TutorialPeraWallet from './pages/TutorialPeraWallet';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token/:id" element={<TokenDetail />} />
        <Route path="/sell" element={<SellToken />} />
        <Route path="/pera" element={<PeraWalletConnectComponent />} />
        <Route path="/Tutorial" element={<TutorialPeraWallet/>} />
      </Routes>
    </Router>
  );
}

export default App;
