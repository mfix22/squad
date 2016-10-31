import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
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
