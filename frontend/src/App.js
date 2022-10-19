import './App.css';
import Home from './pages/Home/components/Home';
import Header from './shared/header/Header';

import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useEffect, useState } from 'react';
function App() {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState()
 



  const login = useCallback((uid, token)=>{
    setToken(token)
    setUserId(uid)
    localStorage.setItem('userData', JSON.stringify({
      userId:uid,
      token:token
    }))
  },[])
  const logout = useCallback(()=>{
    setToken(false)
    setUserId(null)
    localStorage.removeItem('userData')
  },[])

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('userData'))
    if(user){
      login(user.userId, user.token)
    }
  },[login])
  return (
    <AuthContext.Provider
    value={{
      isLoggedIn:!!token,
      token:token,
      userId:userId,
      login:login,
      logout:logout
    }} >

    <Router>
      {!token &&<Routes>
        <Route path='/' element={
          <div>
          <Header  />
            <Home />
            </div>
        }   />
        <Route path='/login' element={<Auth login />} />
        <Route path='/signup' element={<Auth signup />} />



        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes> }
      {token && <Routes>
         <Route path='/' element={
          <div>
          <Header />
            <Home />
            </div>
        }   />
 

        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes> }
      
      
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
