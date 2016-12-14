import axios from 'axios'
import moment from 'moment'
import { ADD_USER, receiveEvent, receiveGoogleEvents, error } from './actions'

const client = axios.create({
  baseURL: process.env.SQUAD_HOST || 'http://localhost:4000',
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

const authorize = () => {
  const GoogleAuth = gapi.auth2.getAuthInstance()
  return GoogleAuth.signIn({
    prompt: 'select_account login'
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
      maxResults: 25,
      orderBy: 'startTime'
    }
  })
}

const loadAllGoogleEvents = () => {
  return (dispatch, getState) => {
    const users = getState().users
    // TODO fix function programming
    return axios.all(users.map(getGoogleEvents)).then(axios.spread(
      (...eventGroups) => eventGroups
                          .filter(group => group.length)
                          .reduce((events, group) => events.concat(group.data.items), [])
                          .map(data => dispatch(receiveGoogleEvents(data)))),
      err => dispatch(error(err))
    )
  }
}

const authorizeThenLoadGoogleEvents = id => (dispatch, getState) => authorize()
  .then(
    (response) => {
      const token = response.Zi.access_token
      if (!getState().users.includes(token)) {
        dispatch({ type: ADD_USER, user: token })
      }
      return getGoogleEvents(token, id)
    },
    err => dispatch(error(err))
  )
  .then(
    response => dispatch(receiveGoogleEvents(response.data.items)),
    err => dispatch(error(err))
  )


const fetchEvent = id => dispatch => client.get(`/event/${id}`).then(
  response => dispatch(receiveEvent(response.data)),
  err => dispatch(error(err))
)

const sendVote = ({ id, option }) => dispatch =>
  client.post(`/vote/${id}`, {
    time: moment(option).unix()
  }).then(
    response => dispatch(receiveEvent(response.data)),
    err => dispatch(error(err))
  )

const sendToken = ({ id, token }) => (dispatch, getState) => {
  if (!getState().users.includes(token)) {
    return client.post(`/authToken/${id}`, { token }).then(
      (response) => {
        dispatch(receiveEvent(response.data))
        dispatch(loadAllGoogleEvents())
      },
      err => dispatch(error(err)))
  }

  return Promise.resolve() // no need to send server
}

// meta is extra data to include outside of state
const sendEvent = (meta) => {
  if (!meta.title) throw Error('Events require title')
  return (dispatch, getState) => {
    const state = getState()
    const { options } = state.form
    const { title, location, duration } = meta
    const body = {
      title,
      location,
      duration,
      emails: state.emails,
      tokens: state.users,
      options: options.reduce((accum, option) => {
        return Object.assign(accum, {
          [moment(Object.keys(option)[0]).unix()]: 0
        })
      }, {}),
    }
    return client.post('/event', body).catch(err => dispatch(error(err)))
  }
}

export { authorize, fetchEvent, sendVote, sendEvent, sendToken, loadAllGoogleEvents, authorizeThenLoadGoogleEvents }
