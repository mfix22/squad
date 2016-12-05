import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, browserHistory } from 'react-router'

import Scheduler from './pages/Scheduler'
import { color } from '../vars'

import configureStore from '../helpers/configureStore'
import { loadGoogleEvents } from '../api'
import { loadState, saveState } from '../helpers/localStorage'

const store = configureStore(loadState())

store.subscribe(() => {
  saveState(store.getState())
})

store.getState().users.forEach((user) => {
  store.dispatch(loadGoogleEvents(user))
})

injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: color.green,
    accent1Color: color.green,
  }
})

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path="/new" component={Scheduler} />
        <Route path="/:event_id(#share)" component={Scheduler} />
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default App
