import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import ManageAppIds from '../ManageAppIds'
import ManageUsers from '../ManageUsers'
import RequireAuth from '../RequireAuth'
import RequireNoAuth from '../RequireNoAuth'
import Notification from '../Notification'
import RouteWithLayout from '../RouteWithLayout'
import { FullscreenLayout, SidebarLayout } from '../../layouts'

const App = () => (
  <div>
    <Switch>
      <RouteWithLayout
        exact
        path={LoginForm.route}
        layout={FullscreenLayout}
        component={RequireNoAuth(LoginForm, IssueCert.route)}
      />
      <RouteWithLayout
        exact
        path={IssueCert.route}
        layout={SidebarLayout}
        component={RequireAuth(IssueCert, LoginForm.route)}
      />
      <RouteWithLayout
        exact
        path={ManageAppIds.route}
        layout={SidebarLayout}
        component={RequireAuth(ManageAppIds, LoginForm.route)}
      />
      <RouteWithLayout
        exact
        path={ManageUsers.route}
        layout={SidebarLayout}
        component={RequireAuth(ManageUsers, LoginForm.route)}
      />
      <Redirect to={LoginForm.route} />
    </Switch>
    <Notification />
  </div>
)

export default App
