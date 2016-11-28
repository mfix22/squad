import { ADD_EMAIL, DELETE_EMAIL } from '../actions'

const emails = (state = [], action) => {
  switch (action.type) {
    case ADD_EMAIL: {
      if (!action.email) return state
      return [action.email, ...state]
    }
    case DELETE_EMAIL: {
      return state.filter(email => email !== action.email)
    }
    default:
      return state
  }
}

export default emails
