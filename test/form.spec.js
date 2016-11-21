import { expect } from 'chai'
import moment from 'moment'
import { createStore } from 'redux'
import reducer from '../client/reducers/index'
import { voteSort } from '../client/reducers/form'

describe('Form Reducer', () => {
  it('should sort votes by vote count and then start date', () => {
    let a = {
      count: 0,
      time: moment().format()
    }
    let b = {
      count: 1,
      time: moment().format()
    }
    expect(voteSort(a,b)).to.be.above(0)
    b.count = 0;
    expect(voteSort(a,b)).to.equal(0)
    b = {
      count: 0,
      timeFrom: moment().add(1, 'd').format()
    }
    console.log(voteSort(a,b));
    expect(voteSort(a,b)).to.be.below(0)
  })

  it('should change time by dispatching CHANGE_TIME', () => {
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
    expect(store.getState().form.time).to.be.null
  })
  it('should change date by dispatching CHANGE_DATE', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_DATE',
      date: moment('2020-10-10').format()
    })
    expect(moment(store.getState().form.date).format('LL')).to.equal(moment('2020-10-10').format('LL'))
    store.dispatch({
      type: 'CHANGE_DATE',
      date: null
    })
    expect(store.getState().form.date).to.be.null
  })
  it('should change duration by dispatching CHANGE_DURATION', () => {
    const store = createStore(reducer)
    store.dispatch({
      type: 'CHANGE_DURATION',
      duration: 60*60*1000
    })
    expect(store.getState().form.duration).to.equal(60*60*1000)
    store.dispatch({
      type: 'CHANGE_DURATION',
      duration: null
    })
    expect(store.getState().form.duration).to.equal(30 * 60 * 1000)
  })
  it('should add a vote with ADD_OPTION and clear the form', () => {
    const newTime = moment()
    const newDate = moment()
    const store = createStore(reducer, {
      form: {
        time: newTime.format(),
        date: newDate.format(),
        duration: 3600000,
        options: []
      }
    })
    store.dispatch({ type: 'ADD_OPTION' })
    expect(store.getState().form.options).to.have.lengthOf(1)
    const newVote = store.getState().form.options[0]
    const form = store.getState().form

    expect(Object.keys(newVote)[0]).to.equal(moment({
      year: newDate.year(),
      month: newDate.month(),
      day: newDate.date(),
      hour: newTime.hour(),
      minute: newTime.minute()
    }).format())

    expect(form.time).to.be.null
  })
  it('should remove a vote with DELETE_OPTION', () => {
    const store = createStore(reducer, {
      form: {
        time: moment().format(),
        options: [
          {
            1: 0,
          },
          {
            2: 2,
          }
        ]
      }
    })
    store.dispatch({ type: 'DELETE_OPTION', time: '1' })
    expect(store.getState().form.options).to.have.lengthOf(1)
    expect(store.getState().form.options[0]).to.have.keys('2')
  })

  it('simulates receiving options from the server', () => {
    const options = [
      {
        "id":"ebc633cb-ed52-479a-8c57-dbd2c59bb700",
        "time":"2016-11-16T04:00:03.165Z",
        "count": 4
      },
      {
        "id":"ebc633cb-ed52-479a-8c57-dbd2c59bb701",
        "time":"2016-11-16T06:00:03.165Z",
        "count": 1
      },
      {
        "id":"ebc633cb-ed52-479a-8c57-dbd2c59bb702",
        "time":"2016-11-16T07:00:03.165Z",
        "count": 0
      }
    ]
    const store = createStore(reducer)
    store.dispatch({
      type: 'RECEIVE_EVENT',
      options
    })
    expect(store.getState().form.options).to.deep.equal(options)

    const prevState = store.getState()
    store.dispatch({
      type: 'RECEIVE_EVENT',
      options: null
    })
    expect(store.getState()).to.deep.equal(prevState)
  })
})
