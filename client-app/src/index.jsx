import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment'

import App from './components/App'
import reducer from './reducers'
import { fetchEvents } from './api'

injectTapEventPlugin();

const store = createStore(reducer, applyMiddleware(thunk, createLogger()))
store.dispatch(fetchEvents());

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
