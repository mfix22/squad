import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import moment from 'moment'

const fakeState = {
  date : moment(),
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
    {
      id : 3,
      title : `Test Meeting w/ some B`,
      time :  moment().add(1,'d').format(),
      location : `ECB`,
      color: '#239207'
    },
    {
      id : 4,
      title : `HELP`,
      time :  moment().add(5,'d').format(),
      location : `ECB`,
      color: '#cced00'
    }
  ]
}

const store = createStore(reducer, fakeState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
