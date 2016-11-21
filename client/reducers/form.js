import moment from 'moment'
import {
  ADD_OPTION,
  DELETE_OPTION,
  CHANGE_TIME,
  CHANGE_DATE,
  RECEIVE_EVENT,
  CHANGE_DURATION
} from '../actions'

const DEFAULT_DURATION = 30 * 60 * 1000

export const voteSort = (a, b) => {
  if (a.count === b.count) {
    return moment(a.time).toDate() - moment(b.time).toDate()
  }
  return b.count - a.count
}

const form = (state, action) => {
  if (!state) {
    return {
      time: null,
      date: null,
      duration: DEFAULT_DURATION,
      options: []
    }
  }

  switch (action.type) {
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
    case RECEIVE_EVENT: {
      if (!action.options) return state
      return Object.assign({}, state, {
        options: action.options.sort(voteSort)
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
        options: state.options.filter(vote =>
          vote.time !== action.id
        ).sort(voteSort)
      })
    default:
      return state
  }
}

export default form
