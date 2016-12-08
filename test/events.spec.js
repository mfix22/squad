import { expect } from 'chai'
import { createStore } from 'redux'
import reducer from '../client/reducers/events'

import { RECEIVE_EVENTS } from '../client/actions'

const fakeState = {
  events: [
    {
      id: 1,
      title: 'Birthday',
      time: '2016-11-17T16:30:00-05:00',
      location: 'Home',
      color: '#f284a8'
    },
    {
      id: 2,
      title: "Meeting @ Aldo's",
      time: '2016-11-18T17:30:00-05:00',
      location: "Aldo's Cafe"
    },
    {
      id: 3,
      title: 'Test Meeting w/ some B',
      time: '2016-11-18T18:30:00-05:00',
      location: 'ECB',
      color: '#239207'
    },
    {
      id: 4,
      title: 'HELP',
      time: '2016-11-19T13:00:00-05:00',
      location: 'ECB',
      color: '#cced00'
    }
  ]
}

describe(`Dispatch ${RECEIVE_EVENTS}`, () => {
  it('simulates receiving events from the server', () => {
    const store = createStore(reducer)
    // ensure store is immutable
    store.dispatch({
      type: RECEIVE_EVENTS,
      events: fakeState.events
    })
    expect(store.getState()).to.deep.equal(fakeState.events)
  })
})
