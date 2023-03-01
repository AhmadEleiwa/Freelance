import './App.css';
import Home from './pages/Home/Home';
import Header from './shared/header/Header';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useCallback, useEffect, useState } from 'react';
import Upload from './pages/Upload/Upload';
import Delete from './pages/Delete/Delete';
import View from './pages/View/View';
import SearchViewPage from './pages/SearchView/SearchViewPage';
import Update from './pages/Update/Update';

function App() {
  const [token, setToken] = useState()
  const [userId, setUserId] = useState()




  const login = useCallback((uid, token) => {
    // console.log(token)
    setToken(token)
    setUserId(uid)
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token
    }))
  }, [])
  const logout = useCallback(() => {
    setToken(false)
    setUserId(null)
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userData'))
    if (user) {
      login(user.userId, user.token)
    }
  }, [login])



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }} >

      <Router>
        <main>
          {!token && <Switch>



            <Route path='/login'  ><Auth login /></Route>
            <Route path='/signup'  ><Auth signup /></Route>
            <Route path={'/View/:pid'} exact>
              <>
                <Header minimal />
                <View />
              </>
            </Route>
            <Route path={'/search/:name'} exact>
              <>
                <Header minimal />
                <SearchViewPage search />
              </>
            </Route>
            <Route path={'/products'} exact>
              <>
                <Header minimal />
                <SearchViewPage  />
              </>
            </Route>

            <Route path={'/Update/:pid'} exact>
                <Update  />
            </Route>
   
            <Route path={'/'}   >
              <div>
                <Header />
                <Home />
              </div>
            </Route>
            
            <Redirect to={'/'} />

          </Switch>
          }
          {token && <Switch>
            <Route path={'/'} exact >
              <>
                <Header />
                <Home />
              </>
            </Route>
            <Route path={'/upload'} exact><Upload /></Route>
            <Route path={'/View/:pid'} exact>
              <>
                <Header minimal />
                <View />
              </>
            </Route>
            <Route path={'/delete/:pid'} exact>
                <Delete  />
            </Route>
            <Route path={'/search/:name'} exact>
              <>
                <Header minimal />
                <SearchViewPage search />
              </>
            </Route>
            <Route path={'/products'} exact>
              <>
                <Header minimal />
                <SearchViewPage  />
              </>
            </Route>

            <Route path={'/Update/:pid'} exact>
                <Update  />
            </Route>




            <Redirect to={'/'} />


          </Switch>
          }

        </main>



      </Router>
    </AuthContext.Provider>
  );

}
export default App;
