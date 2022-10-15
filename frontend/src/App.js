import './App.css';
import Home from './pages/Home/components/Home';
import Header from './shared/header/Header';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './pages/Auth';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={
          <div>
          <Header />
            <Home />
            </div>
        }   />
        <Route path='/login' element={<Auth login />} />
        <Route path='/signup' element={<Auth signup />} />

        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes>
      </Router>
  );
}

export default App;
