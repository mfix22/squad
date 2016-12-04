import { expect } from 'chai'
import moment from 'moment'
import { createStore } from 'redux'
import reducer from '../client/reducers/users'
import { ADD_USER } from '../client/actions'

describe('Email Reducer', () => {
  const store = createStore(reducer)
  it('should be empty to start', () => {
    expect(store.getState()).to.deep.equal([])
  })
  it('should add users with ADD_USER', () => {
    store.dispatch({
      type: ADD_USER,
      user: 'masdfasdf98sd90f8a'
    })
    expect(store.getState()).to.deep.equal(['masdfasdf98sd90f8a'])
    store.dispatch({
      type: ADD_USER,
    })
    expect(store.getState()).to.deep.equal(['masdfasdf98sd90f8a'])
  })
})
