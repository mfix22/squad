import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import moment from 'moment'

const fakeState = {
  events : [
    {
      id : 1,
      title : 'Birthday',
      time : moment().format(),
      location : 'Home',
      color: '#f284a8'
    },
    {
      id : 2,
      title : `Meeting @ Aldo's`,
      time :  moment().add(1,'d').format(),
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
