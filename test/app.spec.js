import { expect } from 'chai'
import moment from 'moment'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../client-app/src/reducers/index'
import deepFreeze from 'deep-freeze'

const VIEW_TODAY = 'VIEW_TODAY'
const VIEW_NEXT = 'VIEW_NEXT'
const VIEW_PREV = 'VIEW_PREV'
const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

const fakeState = {
  events: [
    {
      id: 1,
      title: 'Birthday',
      time: '2016-11-12T16:35:09-05:00',
      location: 'Home',
      color: '#f284a8'
    },
    {
      id: 2,
      title: "Meeting @ Aldo's",
      time: '2016-11-13T16:35:09-05:00',
      location: "Aldo's Cafe"
    },
    {
      id: 3,
      title: 'Test Meeting w/ some B',
      time: '2016-11-11T16:35:09-05:00',
      location: 'ECB',
      color: '#239207'
    },
    {
      id: 4,
      title: 'HELP',
      time: '2016-11-11T16:35:09-05:00',
      location: 'ECB',
      color: '#cced00'
    }
  ]
}

describe('Date reducer', () => {
  it('changes reference date to today on VIEW TODAY', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: VIEW_TODAY
    })
    expect(store.getState().date.value).to.equal(moment().format())
  })
  it('no matter what', () => {
    const store = createStore(reducer)
    store.dispatch({ type: VIEW_PREV })
    store.dispatch({ type: VIEW_NEXT })
    store.dispatch({ type: VIEW_NEXT })
    store.dispatch({ type: VIEW_NEXT })

    store.dispatch({ type: VIEW_TODAY })
    expect(store.getState().date.value).to.equal(moment().format())
  })
  it('changes reference date to one month from now by default on VIEW_NEXT', () => {
    const store = createStore(reducer)
    const state = store.getState()
    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(1, 'M').format())
  })
})

describe('Form Reducer', () => {
  it('should change from-time by dispatching CHANGE_TIME_FROM', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_TIME_FROM',
      time: moment().format()
    })
    expect(store.getState().form.timeFrom).to.equal(moment().format())
    store.dispatch({
      type: 'CHANGE_TIME_FROM',
      time: null
    })
    expect(store.getState().form.timeFrom).to.equal(null)
  })
  it('should change from-time by dispatching CHANGE_TIME_TO', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_TIME_TO',
      time: moment().format()
    })
    expect(store.getState().form.timeTo).to.equal(moment().format())
  })
  it('should change from-time by dispatching CHANGE_DATE', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_DATE',
      date: moment().format()
    })
    expect(store.getState().form.date).to.equal(moment().format())
  })
})

describe('Rehydrate fake state', () => {
  it('imports preloaded state', () => {
    const store = createStore(reducer, fakeState)
    expect(store.getState().events).to.deep.equal(fakeState.events)
  })
})

describe('Dispatch RECEIVE_EVENTS', () => {
  it('simulates receiving events from the server', () => {
    const store = createStore(reducer)
    // ensure store is immutable
    deepFreeze(store)
    const prevDate = store.getState().date
    store.dispatch({
      type: RECEIVE_EVENTS,
      events: fakeState.events
    })
    expect(store.getState().events).to.deep.equal(fakeState.events)
  })
})
