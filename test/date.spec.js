import { expect } from 'chai'
import moment from 'moment'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../client/reducers/index'

import {
  VIEW_TODAY,
  VIEW_PREV,
  VIEW_NEXT,
  CHANGE_WINDOW,
  RECEIVE_EVENT,
} from '../client/actions'

const fakeState = {
  "events": [
    {
        "id": 1,
        "title": "Birthday",
        "time": "2016-11-17T16:30:00-05:00",
        "location": "Home",
        "color": "#f284a8"
    },
    {
        "id": 2,
        "title": "Meeting @ Aldo's",
        "time": "2016-11-18T17:30:00-05:00",
        "location": "Aldo's Cafe"
    },
    {
        "id": 3,
        "title": "Test Meeting w/ some B",
        "time": "2016-11-18T18:30:00-05:00",
        "location": "ECB",
        "color": "#239207"
    },
    {
        "id": 4,
        "title": "HELP",
        "time": "2016-11-19T13:00:00-05:00",
        "location": "ECB",
        "color": "#cced00"
    }
  ]
}

describe('Date reducer', () => {
  it(`changes reference date to today on ${VIEW_TODAY}`, () => {
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
  it(`changes reference date to one unit (depending on view) from now by default on ${VIEW_NEXT}`, () => {
    let store = createStore(reducer)
    let state = store.getState()
    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(4, 'd').format())

    store = createStore(reducer, {
      date : {
        view: 'WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(1, 'w').format())

    store = createStore(reducer, {
      date : {
        view: '2_WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(2, 'w').format())

    store = createStore(reducer, {
      date : {
        view: 'MONTH'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(1, 'M').format())


    store = createStore(reducer, {
      date : {
        value: moment().format(),
        view: 'UNKNOWN_VIEW'
      }
    })
    const prevState = store.getState()
    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState()).to.deep.equal(prevState)

  })
  it(`changes reference date to one unit (depending on view) in the past by default on ${VIEW_PREV}`, () => {
    let store = createStore(reducer)
    let state = store.getState()
    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(-4, 'd').format())

    store = createStore(reducer, {
      date : {
        view: 'WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(-1, 'w').format())

    store = createStore(reducer, {
      date : {
        view: '2_WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(-2, 'w').format())

    store = createStore(reducer, {
      date : {
        view: 'MONTH'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().date.value).to.equal(moment(state.date.value).add(-1, 'M').format())

    store = createStore(reducer, {
      date : {
        value: moment().format(),
        view: 'UNKNOWN_VIEW'
      }
    })
    const prevState = store.getState()
    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState()).to.deep.equal(prevState)

  })

  it(`changes number of days in view with ${CHANGE_WINDOW}`, () => {
    const store = createStore(reducer)
    const views = ['4_DAY', 'WEEK', '2_WEEK', 'MONTH']
    views.forEach((view) => {
      store.dispatch({
        type: CHANGE_WINDOW,
        view
      })
      expect(store.getState().date.view).to.equal(view)
    })
  })
})

describe('Rehydrate fake state', () => {
  it('imports preloaded state', () => {
    const store = createStore(reducer, fakeState)
    expect(store.getState().events).to.deep.equal(fakeState.events)
  })
})

describe(`Dispatch ${RECEIVE_EVENT}`, () => {
  it('simulates receiving events from the server', () => {
    const store = createStore(reducer)
    // ensure store is immutable
    store.dispatch({
      type: RECEIVE_EVENT,
      events: fakeState.events
    })
    expect(store.getState().events).to.deep.equal(fakeState.events)
  })
})
