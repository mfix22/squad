const CHANGE_TIME_FROM = 'CHANGE_TIME_FROM'
const CHANGE_TIME_TO = 'CHANGE_TIME_TO'
const CHANGE_DATE = 'CHANGE_DATE'
const ADD_VOTE = 'ADD_VOTE'

const votes = (state, action) => {
  if (!state) {
    return {
      timeFrom: null,
      timeTo: null,
      date: null
    }
  }
  switch (action.type) {
    case CHANGE_TIME_FROM:
      return Object.assign({}, state, {
        timeFrom: action.time
      })
    case CHANGE_TIME_TO:
      return Object.assign({}, state, {
        timeTo: action.time
      })
    case CHANGE_DATE:
      return Object.assign({}, state, {
        date: action.date
      })
    case ADD_VOTE:
      return {
        timeFrom: null,
        timeTo: null,
        date: null
      }
    default:
      return state
  }
}

export default votes
