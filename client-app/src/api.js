import axios from 'axios'
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

export { fetchEvents }
