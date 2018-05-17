import React from 'react'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import { Route, Switch, Redirect } from 'react-router-dom'
import RequireAuth from '../RequireAuth'

const App = () => (
  <Switch>
    <Route exact path={LoginForm.route} component={LoginForm} />
    {/* // TODO: add required roles to RequireAuth */}
    <Route exact path="/issue" component={RequireAuth(IssueCert, LoginForm.route)} />
    <Redirect to={LoginForm.route} />
  </Switch>
)

export default App
