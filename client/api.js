import axios from 'axios'
import moment from 'moment'
import { RECEIVE_EVENT, RECEIVE_EVENTS, ADD_USER, receiveEvent } from './actions'
import { getColor } from './helpers/util'

const client = axios.create({
  // baseURL: 'http://api.squadup.io',
  baseURL: 'http://localhost:4000',
  responseType: 'json',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})
client.defaults.headers.post['Content-Type'] = 'application/json'

const googleCalendarClient = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/calendars',
  responseType: 'json'
})

const googleAuthClient = axios.create({
  baseURL: 'https://accounts.google.com/o/oauth2/v2',
  responseType: 'json'
})

const fetchEvent = (id) => {
  return (dispatch) => {
    return client.get(`/event/${id}`).then((response) => {
      dispatch(receiveEvent(response.data))
    }).catch((err) => {
      return dispatch({
        type: 'ERROR',
        err
      })
    })
  }
}

const sendVote = ({ id, option }) => {
  return (dispatch) => {
    return client.post(`/vote/${id}`, {
      time: moment(option).unix()
    }).then((response) => {
      dispatch(receiveEvent(response.data))
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
  if (!meta) throw Error('Events require title')
  return (dispatch, getState) => {
    const state = getState()
    const { location, duration, options } = state.form
    const body = {
      title: meta,
      location: location.description,
      duration,
      emails: state.emails,
      options: options.reduce((accum, option) => {
        return Object.assign(accum, {
          [moment(Object.keys(option)[0]).unix()]: 0
        })
      }, {}),
      users: state.users
    }
    return client.post('/event', body).then((response) => {
      const { id } = response.data
      window.location = window.location.origin + `/event/${id}`
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
        type: RECEIVE_EVENTS,
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
        type: RECEIVE_EVENTS,
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

export { fetchEvent, sendVote, sendEvent, loadGoogleEvents, authorizeThenLoadGoogleEvents }
