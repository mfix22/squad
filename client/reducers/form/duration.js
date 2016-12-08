import { CHANGE_DURATION, RECEIVE_EVENT } from '../../actions'

const DEFAULT_DURATION = 30 * 60 * 1000

const duration = (state, action) => {
  if (!state) return DEFAULT_DURATION

  switch (action.type) {
    case CHANGE_DURATION:
      if (!action.duration) {
        return DEFAULT_DURATION
      }
      return action.duration
    case RECEIVE_EVENT: {
      return action.duration
    }
    default:
      return state
  }
}

export default duration
