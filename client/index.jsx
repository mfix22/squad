import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, browserHistory } from 'react-router'

import App from './components/App'
import configureStore from './helpers/configureStore'
import { loadGoogleEvents } from './api'
import { color } from './vars'
import { loadState, saveState } from './helpers/localStorage'

injectTapEventPlugin()

const store = configureStore(loadState())

store.subscribe(() => {
  saveState(store.getState())
})

store.getState().users.forEach((user) => {
  store.dispatch(loadGoogleEvents(user))
})

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: color.green,
    accent1Color: color.green,
  }
})

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/new" component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
