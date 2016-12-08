import { CHANGE_LOCATION, RECEIVE_EVENT } from '../../actions'

const location = (state, action) => {
  if (!state) return null

  switch (action.type) {
    case CHANGE_LOCATION:
      if (action.location) return action.location
      return state
    case RECEIVE_EVENT: {
      return action.location
    }
    default:
      return state
  }
}

export default location
