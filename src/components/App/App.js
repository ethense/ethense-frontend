import React from 'react'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import { Route, Switch, Redirect } from 'react-router-dom'
import RequireAuth from '../RequireAuth'
import RequireNoAuth from '../RequireNoAuth'

const App = () => (
  <Switch>
    <Route
      exact
      path={LoginForm.route}
      component={RequireNoAuth(LoginForm, IssueCert.route)}
    />
    {/* // TODO: add required roles to RequireAuth */}
    <Route
      exact
      path={IssueCert.route}
      component={RequireAuth(IssueCert, LoginForm.route)}
    />
    <Redirect to={LoginForm.route} />
  </Switch>
)

export default App
