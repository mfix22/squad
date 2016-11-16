import { v4 } from 'node-uuid'

const ADD_VOTE = 'ADD_VOTE'
const DELETE_VOTE = 'DELETE_VOTE'


const votes = (state, action) => {
  if (!state) {
    return []
  }
  switch (action.type) {
    case ADD_VOTE :
      return [
        Object.assign({}, state.form, {
          id: v4()
        }),
        ...state
      ]
    case DELETE_VOTE:
      return state.filter(vote =>
        vote.id !== action.id
      )
    default:
      return state
  }
}

export default votes
