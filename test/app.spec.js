import { expect } from 'chai'
import moment from 'moment'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../client-app/src/reducers/index'
import deepFreeze from 'deep-freeze'

const VIEW_TODAY = 'VIEW_TODAY';
const VIEW_NEXT = 'VIEW_NEXT';
const VIEW_PREV = 'VIEW_PREV';
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
		expect(store.getState().date.value).to.equal(moment().format())
  });
  it('no matter what', () => {
    const store = createStore(reducer)
    store.dispatch({ type : VIEW_PREV });
    store.dispatch({ type : VIEW_NEXT });
    store.dispatch({ type : VIEW_NEXT });
    store.dispatch({ type : VIEW_NEXT });

    store.dispatch({ type : VIEW_TODAY });
    expect(store.getState().date.value).to.equal(moment().format())
  });
});

describe('Dispatch VIEW_NEXT', function() {
  it('changes reference date to one month from now by default', () => {
    const store = createStore(reducer)
    const state = store.getState();
		store.dispatch({
			type : VIEW_NEXT
		});
		expect(store.getState().date.value).to.equal(moment(state.date.value).add(1, 'M').format())
  });
});

//
// describe('Dispatch VIEW_PREV_MONTH', function() {
//   it('changes reference date to previous month', () => {
//     const store = createStore(reducer)
// 		store.dispatch({
// 			type : VIEW_PREV_MONTH
// 		});
// 		expect(store.getState().date).to.equal(moment().add(-1, 'M').format())
//   });
// });

describe('Rehydrate fake state', function() {
  it('imports preloaded state', () => {
    const store = createStore(reducer, fakeState)
    expect(store.getState()).to.deep.equal({
      date : {
        value : moment().format(),
        view : "MONTH"
      },
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
