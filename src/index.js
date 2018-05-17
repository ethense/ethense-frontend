import React from 'react'
import ReactDOM from 'react-dom'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import CssBaseline from 'material-ui/CssBaseline'
import {
  createGenerateClassName,
  jssPreset,
  MuiThemeProvider,
} from 'material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App/App'
import muiTheme from './muiTheme'
import { store } from './store'
import registerServiceWorker from './registerServiceWorker'

const styleNode = document.createComment('insertion-point-jss')
document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'insertion-point-jss'

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  </React.Fragment>,
  document.getElementById('root')
)

registerServiceWorker()
