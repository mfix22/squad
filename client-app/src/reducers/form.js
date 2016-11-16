import { v4 } from 'node-uuid'

const ADD_VOTE = 'ADD_VOTE'
const DELETE_VOTE = 'DELETE_VOTE'
const RECEIVE_VOTES = 'RECEIVE_VOTES'

const CHANGE_TIME_FROM = 'CHANGE_TIME_FROM'
const CHANGE_TIME_TO = 'CHANGE_TIME_TO'
const CHANGE_DATE = 'CHANGE_DATE'

const votes = (state, action) => {
  if (!state) {
    return {
      timeFrom: null,
      timeTo: null,
      date: null,
      votes: []
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
    case RECEIVE_VOTES: {
      return Object.assign({}, state, {
        votes: action.votes
      })
    }
    case ADD_VOTE: {
      const { timeFrom, timeTo, date } = state
      return {
        timeFrom: null,
        timeTo: null,
        date: null,
        votes: [
          {
            id: v4(),
            timeFrom,
            timeTo,
            date
          },
          ...state.votes
        ]
      }
    }
    case DELETE_VOTE:
      return Object.assign({}, state, {
        votes: state.votes.filter(vote =>
          vote.id !== action.id
        )
      })
    default:
      return state
  }
}

export default votes
