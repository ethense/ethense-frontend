import React from 'react'
import LoginForm from '../LoginForm'
import IssueCert from '../IssueCert'
import { Route, Switch, Redirect } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginForm} />
    <Route exact path="/issue" component={IssueCert} />
    <Redirect from="*" to="/" />
  </Switch>
)

export default App
