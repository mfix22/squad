import { v4 } from 'node-uuid'

const ADD_EVENT = 'ADD_EVENT';

const singleEvent = (state, action) => {
  switch (action.type) {
    case ADD_EVENT :
      return {
        id : v4(),
        title : action.title,
        time : action.time,
        location : action.location || ""
      }
    default:
      return state;
  }
}

const events = (state = [], action) => {
  switch (action.type) {
    case ADD_EVENT :
      return [
        ...state,
        singleEvent(null, action)
      ]
    default:
      return state
  }
}

export default events
