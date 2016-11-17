import { RECEIVE_EVENT } from '../actions'

// const singleEvent = (state, action) => {
//   switch (action.type) {
//     case ADD_EVENT :
//       return {
//         id : v4(),
//         title : action.title,
//         time : action.time,
//         location : action.location || ""
//       }
//     default:
//       return state;
//   }
// }

const events = (state = [], action) => {
  switch (action.type) {
    // case ADD_EVENT :
    //   return [
    //     ...state,
    //     // singleEvent(null, action)
    //   ]
    case RECEIVE_EVENT :
      return action.events
    default:
      return state
  }
}

export default events
