import React from 'react'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import { Route, Switch, Redirect } from 'react-router-dom'
import RequireAuth from '../RequireAuth'
import RequireNoAuth from '../RequireNoAuth'
import Notification from '../Notification'

const App = () => (
  <div>
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
    <Notification />
  </div>
)

export default App
