import axios from 'axios'
import moment from 'moment'
import { RECEIVE_EVENT } from './actions'

const client = axios.create({
  baseURL: 'http://api.squadup.io',
  responseType: 'json'
})

const fetchEvents = (dispatch, getState) => {
  return client.get('/events').then((response) => {
    const { events, options } = response.data
    return dispatch({
      type: RECEIVE_EVENT,
      events,
      options
    })
  }).catch((err) => {
    return dispatch({
      type: 'ERROR',
      err
    })
  })
}

const sendVote = (vote) => {
  return (dispatch) => {
    return client.get('/vote'/*, { // TODO change to post
      time: moment(vote).unix()
    }*/).then((response) => {
      const { options } = response.data
      return dispatch({
        type: RECEIVE_EVENT,
        options
      })
    }).catch((err) => {
      return dispatch({
        type: 'ERROR',
        err
      })
    })
  }
}

const sendEvent = () => {
  return (dispatch, getState) => {
    return client.get('/events'/* , { // TODO change to post
      time: moment(event).unix()
    }*/).then((response) => {
      const { options } = response.data
      return dispatch({
        type: RECEIVE_EVENT,
        options
      })
    }).catch((err) => {
      return dispatch({
        type: 'ERROR',
        err
      })
    })
  }
}

export { fetchEvents, sendVote, sendEvent }
