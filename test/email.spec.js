import { expect } from 'chai'
import moment from 'moment'
import { createStore } from 'redux'
import reducer from '../client/reducers/emails'
import { ADD_EMAIL, DELETE_EMAIL } from '../client/actions'

describe('Email Reducer', () => {
  const store = createStore(reducer)
  it('should be empty to start', () => {
    expect(store.getState()).to.deep.equal([])
  })
  it('should add emails with ADD_EMAIL', () => {
    store.dispatch({
      type: ADD_EMAIL,
      email: 'mfix@wisc.edu'
    })
    expect(store.getState()).to.deep.equal(['mfix@wisc.edu'])
    store.dispatch({
      type: ADD_EMAIL,
    })
    expect(store.getState()).to.deep.equal(['mfix@wisc.edu'])
  })

  it('should delete emails with DELETE_EMAIL', () => {
    store.dispatch({
      type: DELETE_EMAIL,
      email: 'mfix@wisc.edu'
    })
    expect(store.getState()).to.deep.equal([])
  })
})
