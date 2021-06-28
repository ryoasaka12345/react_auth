import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
