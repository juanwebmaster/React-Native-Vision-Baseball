import React, {useState} from 'react';
import Login from '_scenes/login';
import Home from '_scenes/home';
import AppNavigation from '_navigations/AppNavigation';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
      !loggedIn ? <Login setLoggedIn={setLoggedIn} /> : 
        <AppNavigation />
  )
};

export default App;
