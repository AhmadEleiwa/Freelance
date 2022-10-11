import './App.css';
import Home from './pages/Home';
import Header from './shared/header/Header';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
  return (

      <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes>
      </Router>
  );
}

export default App;
