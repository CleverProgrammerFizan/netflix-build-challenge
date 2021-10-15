import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './Screens/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './Screens/ProfileScreen';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //loged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }else {
        //logged out
        dispatch(logout())
      }
    })

    return unsubscribe
  },[dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ): (
          <Switch>
           <Route path = '/Profile'>
              <ProfileScreen />
           </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
        )}
    </Router>
    </div>
  );
}

export default App;
