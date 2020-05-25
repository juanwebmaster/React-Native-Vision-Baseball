import React, {useState} from 'react';
import Login from '_scenes/login';
import Home from '_scenes/home';
import AppNavigation from '_navigations/AppNavigation';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  setInterval(() => {
    SplashScreen.hide();
  }, 1000);
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      loggedIn ? <Login setLoggedIn={setLoggedIn} /> : 
        <AppNavigation />
  )
};

export default App;
