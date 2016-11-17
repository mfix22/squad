import { RECEIVE_EVENT } from '../actions'

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENT: {
      if (!action.events) return state
      return action.events
    }
    default:
      return state
  }
}

export default events
