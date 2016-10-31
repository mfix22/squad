import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment'

import App from './components/App'
import reducer from './reducers'
import configureStore from './helpers/createStore'
import { fetchEvents } from './api'

injectTapEventPlugin();

const store = configureStore();
store.dispatch(fetchEvents());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
