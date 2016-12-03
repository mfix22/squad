import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'
import configureStore from './helpers/configureStore'
import { loadGoogleEvents } from './api'
import { color } from './vars'

injectTapEventPlugin()

const store = configureStore({
  users: ['ya29.GlypAyaVbRZRUtbA34H4Uz5SrW-sN-hZ9Q-bwB0bK-vJo3uRZY1jGrqI4wkXK4LU918Dj4e-ycRyLWW1A1V_WL4gtUVkR5vhq95Cal6W6kkXuwBp9bHCHjwZWP3SyA']
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
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
