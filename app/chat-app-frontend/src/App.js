import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Profile from './components/Profile';
import GraphQLForm from './components/GraphQLForm';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {isAuth ? <Redirect to="/chat" /> : <Login setIsAuth={setIsAuth} />}
        </Route>
        <Route path="/chat">
          {isAuth ? (
            <ErrorBoundary>
              <Chat />
            </ErrorBoundary>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/profile">
          {isAuth ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route path="/graphql">
          <GraphQLForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
