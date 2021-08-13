import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const context = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storedUserLoggedIn = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedIn === 'true') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', 'true');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   // localStorage.setItem('isLoggedIn', 'false');
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  return (
    // <AuthContext.Provider
    //   value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    // >
    <React.Fragment>
      <MainHeader />
      <main>
        {!context.isLoggedIn && <Login  />}
        {context.isLoggedIn && <Home />}
      </main>
      {/*  </AuthContext.Provider>  */}
    </React.Fragment>
  );
}

export default App;
