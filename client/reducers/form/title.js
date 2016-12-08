import { CHANGE_TITLE, RECEIVE_EVENT } from '../../actions'

const title = (state, action) => {
  if (!state) return null

  switch (action.type) {
    case CHANGE_TITLE: {
      if (action.title) return action.title
      return state
    }
    case RECEIVE_EVENT: {
      return action.title
    }
    default:
      return state
  }
}

export default title
