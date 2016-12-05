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
    expect(store.getState().view.date).to.equal(moment().format())
  })
  it('no matter what', () => {
    const store = createStore(reducer)
    store.dispatch({ type: VIEW_PREV })
    store.dispatch({ type: VIEW_NEXT })
    store.dispatch({ type: VIEW_NEXT })
    store.dispatch({ type: VIEW_NEXT })

    store.dispatch({ type: VIEW_TODAY })
    expect(store.getState().view.date).to.equal(moment().format())
  })
  it(`changes reference date to one unit (depending on view) from now by default on ${VIEW_NEXT}`, () => {
    let store = createStore(reducer)
    let state = store.getState()
    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(4, 'd').format())

    store = createStore(reducer, {
      view : {
        window: 'WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(1, 'w').format())

    store = createStore(reducer, {
      view : {
        window: '2_WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(2, 'w').format())

    store = createStore(reducer, {
      view : {
        window: 'MONTH'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_NEXT
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(1, 'M').format())


    store = createStore(reducer, {
      view : {
        date: moment().format(),
        window: 'UNKNOWN_VIEW'
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
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(-4, 'd').format())

    store = createStore(reducer, {
      view : {
        window: 'WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(-1, 'w').format())

    store = createStore(reducer, {
      view : {
        window: '2_WEEK'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(-2, 'w').format())

    store = createStore(reducer, {
      view : {
        window: 'MONTH'
      }
    })
    state = store.getState()

    store.dispatch({
      type: VIEW_PREV
    })
    expect(store.getState().view.date).to.equal(moment(state.view.date).add(-1, 'M').format())

    store = createStore(reducer, {
      view : {
        date: moment().format(),
        window: 'UNKNOWN_VIEW'
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
    views.forEach((window) => {
      store.dispatch({
        type: CHANGE_WINDOW,
        window
      })
      expect(store.getState().view.window).to.equal(window)
    })
  })
})
