import moment from 'moment'
import {
  ADD_OPTION,
  DELETE_OPTION,
  CHANGE_TIME,
  CHANGE_DATE,
  RECEIVE_EVENT,
  CHANGE_DURATION
} from '../actions'

export const voteSort = (a, b) => {
  if (a.count === b.count) {
    return new Date(a.timeFrom) - new Date(b.timeFrom)
  }
  return b.count - a.count
}

const form = (state, action) => {
  if (!state) {
    return {
      time: null,
      date: null,
      duration: 36000,
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
        time: moment(action.time)
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
      // even if null
      return Object.assign({}, state, {
        duration: action.duration
      })
    case RECEIVE_EVENT: {
      return Object.assign({}, state, {
        options: action.options.sort(voteSort)
      })
    }
    case ADD_OPTION: {
      const { time, duration } = state
      if (!time || !duration) return state
      return {
        time: null,
        duration: null,
        options: [
          {
            id: Math.random(),
            time,
            duration,
            count: 0
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
