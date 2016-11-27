import axios from 'axios'
import moment from 'moment'
import { RECEIVE_EVENT } from './actions'

const client = axios.create({
  baseURL: 'http://api.squadup.io',
  responseType: 'json'
})

const googleCalendarClient = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/calendars/',
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

const authorizeAndLoad = () => {
  return gapi.auth.authorize({
    client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    immediate: false
  })
}

const loadGoogleEvents = (id) => {
  return authorizeAndLoad().then((response) => {
    return googleCalendarClient.get(`${id || 'primary'}/events`, {
      params: {
        access_token: response.access_token,
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }
    })
  }).then((eventResponse) => {
    console.log(eventResponse.data.items)
  })
}

export { fetchEvents, sendVote, sendEvent, loadGoogleEvents }
