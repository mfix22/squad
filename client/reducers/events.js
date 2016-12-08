import { RECEIVE_EVENTS } from '../actions'

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENTS: {
      if (!action.events) return state
      return action.events
    }
    default:
      return state
  }
}

export default events
