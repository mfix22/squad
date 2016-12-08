import moment from 'moment'
import {
  ADD_OPTION,
  DELETE_OPTION,
  CHANGE_TITLE,
  CHANGE_TIME,
  CHANGE_DATE,
  CHANGE_DURATION,
  CHANGE_LOCATION,
  RECEIVE_EVENT,
} from '../actions'

const DEFAULT_DURATION = 30 * 60 * 1000

// TODO vote sort
export const voteSort = (a, b) => {
  const aTime = Object.keys(a)[0]
  const bTime = Object.keys(b)[0]
  const aCount = a[aTime]
  const bCount = b[bTime]
  if (aCount === bCount) {
    return moment(aTime).toDate() - moment(bTime).toDate()
  }
  return bCount - aCount
}

const form = (state, action) => {
  if (!state) {
    return {
      time: null,
      date: null,
      duration: DEFAULT_DURATION,
      location: null,
      options: []
    }
  }

  switch (action.type) {
    case CHANGE_TITLE: {
      if (!action.title) return state
      return Object.assign({}, state, {
        title: action.title
      })
    }
    case CHANGE_TIME: {
      if (!action.time) {
        return Object.assign({}, state, {
          time: null
        })
      }

      return Object.assign({}, state, {
        time: moment(action.time).format()
      })
    }
    case CHANGE_DATE: {
      if (!action.date) {
        return Object.assign({}, state, {
          date: null
        })
      }
      return Object.assign({}, state, {
        date: moment(action.date).format()
      })
    }
    case CHANGE_DURATION:
      if (!action.duration) {
        return Object.assign({}, state, {
          duration: DEFAULT_DURATION
        })
      }
      return Object.assign({}, state, {
        duration: action.duration
      })
    case CHANGE_LOCATION:
      if (action.location) {
        return Object.assign({}, state, {
          location: action.location
        })
      }
      return state
    case RECEIVE_EVENT: {
      const { title, location, duration, options } = action
      return Object.assign({}, state, {
        title,
        location,
        duration,
        options: options.sort(voteSort)
      })
    }
    case ADD_OPTION: {
      const { duration } = state
      if (!state.time || !state.date || !duration) return state
      const date = moment(state.date)
      const time = moment(state.time)
      const newTime = moment({
        year: date.year(),
        month: date.month(),
        day: date.date(),
        hour: time.hour(),
        minute: time.minute()
      }).format()

      return {
        time: null,
        duration: DEFAULT_DURATION,
        options: [
          {
            [newTime]: 0
          },
          ...state.options
        ].sort(voteSort)
      }
    }
    case DELETE_OPTION:
      return Object.assign({}, state, {
        options: state.options.filter(option =>
          Object.keys(option)[0] !== action.time
        ).sort(voteSort)
      })
    default:
      return state
  }
}

export default form
