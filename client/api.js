import axios from 'axios'
import moment from 'moment'
import { RECEIVE_EVENT, ADD_USER } from './actions'
import { getColor } from './helpers/util'

const client = axios.create({
  baseURL: 'http://api.squadup.io',
  responseType: 'json'
})

const googleCalendarClient = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/calendars',
  responseType: 'json'
})

const googleAuthClient = axios.create({
  baseURL: 'https://accounts.google.com/o/oauth2/v2',
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
    return client.get('/vote'/* , { // TODO change to post
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

// meta is extra data to include outside of state
const sendEvent = (meta) => {
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

const authorize = () => {
  return gapi.auth.authorize({
    client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    immediate: false
  })
  // return googleAuthClient.get('/auth', {
  //   params: {
  //     response_type: 'token',
  //     client_id: '583561432942-5fcf74j7tmfelnqj5jttnubd55dghdff.apps.googleusercontent.com',
  //     scope: 'https://www.googleapis.com/auth/calendar.readonly',
  //     redirect_uri: 'http://localhost:8080',
  //   }
  // })
}

const getGoogleEvents = (token, id) => {
  return googleCalendarClient.get(`${id || 'primary'}/events`, {
    params: {
      access_token: token,
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 50,
      orderBy: 'startTime'
    }
  })
}

const loadGoogleEvents = (token) => {
  return (dispatch) => {
    return getGoogleEvents(token).then((response) => {
      dispatch({
        type: RECEIVE_EVENT,
        events: response.data.items.map(event => ({
          id: event.id,
          title: event.summary,
          time: moment(event.start.dateTime).format(),
          duration: moment(event.end.dateTime).diff(moment(event.start.dateTime)),
          location: event.location,
          color: getColor(parseInt(event.colorId, 10))
        }))
      })
    }).catch((err) => {
      throw err
    })
  }
}

const authorizeThenLoadGoogleEvents = (id) => {
  return (dispatch) => {
    return authorize().then((response) => {
      dispatch({
        type: ADD_USER,
        user: response.access_token
      })
      return getGoogleEvents(response.access_token, id)
    }).then((eventResponse) => {
      dispatch({
        type: RECEIVE_EVENT,
        events: eventResponse.data.items.map(event => ({
          id: event.id,
          title: event.summary,
          time: moment(event.start.dateTime).format(),
          duration: moment(event.end.dateTime).diff(moment(event.start.dateTime)),
          location: event.location,
          color: getColor(parseInt(event.colorId, 10))
        }))
      })
    })
  }
}

export { fetchEvents, sendVote, sendEvent, loadGoogleEvents, authorizeThenLoadGoogleEvents }
