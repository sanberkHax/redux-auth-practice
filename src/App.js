import Header from './components/Header';
import Cart from './pages/cart';
import Profile from './pages/profile';
import Shop from './pages/shop';
import Home from './pages/home';
import Login from './pages/login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Signup from './pages/signup';
import { authActions } from './store/authSlice';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('idToken');
    if (token) {
      dispatch(authActions.logInUser(token));
    }
  }, [dispatch]);
  return (
    <div className="app">
      <Header></Header>
      <main>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to="/shop" /> : <Home />}
          </Route>
          {isLoggedIn && (
            <Fragment>
              <Route path="/cart">
                <Cart></Cart>
              </Route>
              <Route path="/profile">
                <Profile></Profile>
              </Route>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
            </Fragment>
          )}
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
