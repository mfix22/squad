import axios from 'axios'

const client = axios.create({
  baseURL: 'http://api.squadup.io',
  responseType: 'json'
})

const fetchEvents = (dispatch, getState) => {
  return client.get('/events').then((response) => {
    return dispatch({
      type: 'RECEIVE_EVENTS',
      events: response.data
    })
  }).catch((err) => {
    return dispatch({
      type: 'ERROR',
      err
    })
  })
}

// TODO actually hook /vote to POST
const fetchVotes = (dispatch) => {
  return client.get('/vote').then((response) => {
    return dispatch({
      type: 'RECEIVE_VOTES',
      votes: response.data
    })
  }).catch((err) => {
    return dispatch({
      type: 'ERROR',
      err
    })
  })
}

export { fetchEvents, fetchVotes }
