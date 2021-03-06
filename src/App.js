import React, { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import TodosList from './components/Todos/TodosList';
import TodoAdd from './components/Todos/TodoAdd';

import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/signup">
          {authCtx.isLoggedIn && <Redirect to="/" />}
          {!authCtx.isLoggedIn && <SignupPage />}
        </Route>
        <Route path="/login">
          {authCtx.isLoggedIn && <Redirect to="/" />}
          {!authCtx.isLoggedIn && <LoginPage />}
        </Route>
        <Route path="/changePass">
          {!authCtx.isLoggedIn && <Redirect to="/" />}
          {authCtx.isLoggedIn && <ChangePasswordPage />}
        </Route>
        <Route path="/todosList">
          {!authCtx.isLoggedIn && <Redirect to="/" />}
          {authCtx.isLoggedIn && <TodosList />}
        </Route>
        <Route path="/todoAdd">
          {!authCtx.isLoggedIn && <Redirect to="/" />}
          {authCtx.isLoggedIn && <TodoAdd />}
        </Route>
        <Route path="/profile">
          {!authCtx.isLoggedIn && <Redirect to="/" />}
          {authCtx.isLoggedIn && <ProfilePage />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
