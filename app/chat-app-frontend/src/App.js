import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Profile from './components/Profile';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Route path="/" exact>
        {isAuth ? <Redirect to="/chat" /> : <Login setIsAuth={setIsAuth} />}
      </Route>
      <Route path="/chat">
        {isAuth ? <Chat /> : <Redirect to="/" />}
      </Route>
      <Route path="/profile">
        {isAuth ? <Profile /> : <Redirect to="/" />}
      </Route>
    </Router>
  );
};

export default App;
