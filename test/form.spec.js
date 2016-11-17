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

  it('should change from-time by dispatching CHANGE_TIME', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_TIME',
      time: moment().format()
    })
    expect(moment(store.getState().form.time).format('LT')).to.equal(moment().format('LT'))
    store.dispatch({
      type: 'CHANGE_TIME',
      time: null
    })
    expect(store.getState().form.time).to.equal(null)
  })
  it('should change from-time by dispatching CHANGE_DATE', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_DATE',
      date: moment('2020-10-10').format()
    })
    expect(moment(store.getState().form.time).format('LL')).to.equal(moment('2020-10-10').format('LL'))
  })
  it('should add a vote with ADD_OPTION and clear the form', () => {
    const store = createStore(reducer, {
      form: {
        time: moment().format(),
        votes: []
      }
    })
    store.dispatch({ type: 'ADD_OPTION' })
    expect(store.getState().form.votes).to.have.lengthOf(1)
    const newVote = store.getState().form.votes[0]
    const form = store.getState().form

    expect(newVote.time).to.equal(moment().format())
    expect(newVote.duration).to.equal(3600000)

    expect(form.time).to.be.null
  })
  it('should remove a vote with DELETE_OPTION', () => {
    const store = createStore(reducer, {
      form: {
        time: moment().format(),
        votes: [
          {
            id: 1,
            time: moment().format(),
          },
          {
            id: 2,
            date: moment().format(),
          }
        ]
      }
    })
    store.dispatch({ type: 'DELETE_OPTION', id: 1 })
    expect(store.getState().form.votes).to.have.lengthOf(1)
    expect(store.getState().form.votes[0].id).to.equal(2)
  })
})
