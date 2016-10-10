import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const fakeState = {
  events : [
    {
      id : 1,
      title : 'Birthday',
      time : '2016-09-10T12:45:46-05:00',
      location : 'Home'
    },
    {
      id : 2,
      title : `Meeting @ Aldo's`,
      time : '2016-10-10T17:45:46-05:00',
      location : `Aldo's Cafe`
    },
  ]
}

const store = createStore(reducer, fakeState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
