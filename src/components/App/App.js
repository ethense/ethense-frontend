import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import RequireAuth from '../RequireAuth'
import RequireNoAuth from '../RequireNoAuth'

const App = () => (
  <div>
    <Switch>
      <Route
        exact
        path={LoginForm.route}
        component={RequireNoAuth(LoginForm, IssueCert.route)}
      />
      <Route
        exact
        path={IssueCert.route}
        component={RequireAuth(IssueCert, LoginForm.route)}
      />
      <Route
        exact
        path={ManageAppIds.route}
        component={RequireAuth(ManageAppIds, LoginForm.route)}
      />
      <Route
        exact
        path={ManageUsers.route}
        component={RequireAuth(ManageUsers, LoginForm.route)}
      />
      <Redirect to={LoginForm.route} />
    </Switch>
  </div>
)

export default App
