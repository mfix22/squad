import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './components/App'
import configureStore from './helpers/configureStore'
import { fetchEvents } from './api'

injectTapEventPlugin();

const store = configureStore();
store.dispatch(fetchEvents());

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
