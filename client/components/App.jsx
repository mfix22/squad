import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, browserHistory } from 'react-router'

import Scheduler from './pages/Scheduler'
import Viewer from './pages/Viewer'
import Sharer from './pages/Sharer'

import { color } from '../vars'
import configureStore from '../helpers/configureStore'
import { configureGlobalKeyPress } from '../helpers/configureGlobalListeners'

// import { loadState, saveState } from '../helpers/localStorage'
// store.subscribe(() => {
//   saveState(store.getState())
// })

gapi.load('client', () => {
  gapi.client.init({
    clientId: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    immediate: false
  })
})

const store = configureStore()
configureGlobalKeyPress(store)

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
        <Route path="/event/:event_id" component={Viewer} />
        <Route path="/share/:event_id" component={Sharer} />
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default App
