import { expect } from 'chai'
import moment from 'moment'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../client-app/src/reducers/index'
import deepFreeze from 'deep-freeze'

const VIEW_TODAY = 'VIEW_TODAY';
const VIEW_NEXT_WEEK = 'VIEW_NEXT_WEEK';
const VIEW_PREV_WEEK = 'VIEW_PREV_WEEK';
const VIEW_NEXT_MONTH = 'VIEW_NEXT_MONTH';
const VIEW_PREV_MONTH = 'VIEW_PREV_MONTH';
const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

const fakeState = {
  events : [
    {
      "id": 1,
      "title": "Birthday",
      "time": "2016-10-26T16:35:09-05:00",
      "location": "Home",
      "color": "#f284a8"
    },
    {
      "id": 2,
      "title": "Meeting @ Aldo's",
      "time": "2016-10-27T16:35:09-05:00",
      "location": "Aldo's Cafe"
    },
    {
      "id": 3,
      "title": "Test Meeting w/ some B",
      "time": "2016-10-27T16:35:09-05:00",
      "location": "ECB",
      "color": "#239207"
    },
    {
      "id": 4,
      "title": "HELP",
      "time": "2016-10-31T16:35:09-05:00",
      "location": "ECB",
      "color": "#cced00"
    }
  ]
}

describe('Dispatch VIEW_TODAY', function() {
  it('changes reference date to today', () => {
    const store = createStore(reducer)
		store.dispatch({
			type : VIEW_TODAY
		});
		expect(store.getState().date).to.equal(moment().format())
  });
  it('no matter what', () => {
    const store = createStore(reducer)
    store.dispatch({ type : VIEW_PREV_WEEK });
    store.dispatch({ type : VIEW_NEXT_MONTH });
    store.dispatch({ type : VIEW_NEXT_WEEK });
    store.dispatch({ type : VIEW_NEXT_MONTH });

    store.dispatch({ type : VIEW_TODAY });
    expect(store.getState().date).to.equal(moment().format())
  });
});

describe('Dispatch VIEW_NEXT_MONTH', function() {
  it('changes reference date to one month from now', () => {
    const store = createStore(reducer)
		store.dispatch({
			type : VIEW_NEXT_MONTH
		});
		expect(store.getState().date).to.equal(moment().add(1, 'M').format())
  });
});


describe('Dispatch VIEW_PREV_MONTH', function() {
  it('changes reference date to previous month', () => {
    const store = createStore(reducer)
		store.dispatch({
			type : VIEW_PREV_MONTH
		});
		expect(store.getState().date).to.equal(moment().add(-1, 'M').format())
  });
});

describe('Dispatch VIEW_NEXT_WEEK', function() {
  it('changes reference date to next week', () => {
    const store = createStore(reducer)
		store.dispatch({
			type : VIEW_NEXT_WEEK
		});
		expect(store.getState().date).to.equal(moment().add(1, 'w').format())
  });
});

describe('Dispatch VIEW_PREV_WEEK', function() {
  it('changes reference date to previous week', () => {
    const store = createStore(reducer)
		store.dispatch({
			type : VIEW_PREV_WEEK
		});
		expect(store.getState().date).to.equal(moment().add(-1, 'w').format())
  });
});

describe('Rehydrate fake state', function() {
  it('imports preloaded state', () => {
    const store = createStore(reducer, fakeState)
    expect(store.getState()).to.deep.equal({
      date : moment().format(),
      events : fakeState.events
    })
  })
});

describe('Dispatch RECEIVE_EVENTS', function() {
  it('simulates receiving events from the server', () => {
    const store = createStore(reducer)
    // ensure store is immutable
    deepFreeze(store);
    const prevDate = store.getState().date
    store.dispatch({
      type : RECEIVE_EVENTS,
      events : fakeState.events
    })
    expect(store.getState()).to.deep.equal({
      date : prevDate,
      events : fakeState.events
    })
  })
});
