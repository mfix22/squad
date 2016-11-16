import { expect } from 'chai'
import moment from 'moment'
import { createStore } from 'redux'
import reducer from '../client-app/src/reducers/index'
import { voteSort } from '../client-app/src/reducers/form'

describe('Form Reducer', () => {
  it('should sort votes by vote count and then start date', () => {
    let a = {
      count: 0,
      timeFrom: moment().format()
    }
    let b = {
      count: 1,
      timeFrom: moment().format()
    }
    expect(voteSort(a,b)).to.be.above(0)
    b.count = 0;
    expect(voteSort(a,b)).to.equal(0)
    b = {
      count: 0,
      timeFrom: moment().add(1, 'd').format()
    }
    expect(voteSort(a,b)).to.be.below(0)
  })
  it('receive votes from RECEIVE_VOTES dispatch', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'RECEIVE_VOTES',
      votes: [
        {
          id: 1
        }
      ]
    })
    expect(store.getState().form.votes).to.deep.equal([{ id: 1 }])
  })
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
  it('should add a vote with ADD_VOTE and clear the form', () => {
    const store = createStore(reducer, {
      form: {
        timeFrom: moment().format(),
        timeTo: moment().format(),
        date: moment().format(),
        votes: []
      }
    })
    store.dispatch({ type: 'ADD_VOTE' })
    expect(store.getState().form.votes).to.have.lengthOf(1)
    const newVote = store.getState().form.votes[0]
    const form = store.getState().form

    expect(newVote.timeFrom).to.equal(moment().format())
    expect(newVote.timeTo).to.equal(moment().format())
    expect(newVote.date).to.equal(moment().format())

    expect(form.timeFrom).to.be.null
    expect(form.timeTo).to.be.null
    expect(form.date).to.be.null
  })
  it('should remove a vote with DELETE_VOTE', () => {
    const store = createStore(reducer, {
      form: {
        timeFrom: moment().format(),
        timeTo: moment().format(),
        date: moment().format(),
        votes: [
          {
            id: 1,
            timeFrom: moment().format(),
            timeTo: moment().format(),
            date: moment().format(),
          },
          {
            id: 2,
            timeFrom: moment().format(),
            timeTo: moment().format(),
            date: moment().format(),
          }
        ]
      }
    })
    store.dispatch({ type: 'DELETE_VOTE', id: 1 })
    expect(store.getState().form.votes).to.have.lengthOf(1)
    expect(store.getState().form.votes[0].id).to.equal(2)
  })
})
