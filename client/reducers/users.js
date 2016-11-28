import { ADD_USER } from '../actions'

const users = (state = [], action) => {
  switch (action.type) {
    case ADD_USER: {
      if (!action.user) return state
      return [...state, action.user]
    }
    default:
      return state
  }
}

export default users
