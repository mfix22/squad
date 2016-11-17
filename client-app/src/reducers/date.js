import moment from 'moment'

import {
  VIEW_TODAY,
  VIEW_PREV,
  VIEW_NEXT,
  CHANGE_WINDOW,
} from '../actions'

const getNextViewDelta = (state) => {
  switch (state.view) {
    case '4_DAY':
      return moment(state.value).add(4, 'd').format()
    case 'WEEK':
      return moment(state.value).add(1, 'w').format()
    case '2_WEEK':
      return moment(state.value).add(2, 'w').format()
    case 'MONTH':
      return moment(state.value).add(1, 'M').format()
    default:
      return state
  }
}

const getPrevViewDelta = (state) => {
  switch (state.view) {
    case '4_DAY':
      return moment(state.value).subtract(4, 'd').format()
    case 'WEEK':
      return moment(state.value).subtract(1, 'w').format()
    case '2_WEEK':
      return moment(state.value).subtract(2, 'w').format()
    case 'MONTH':
      return moment(state.value).subtract(1, 'M').format()
    default:
      return state
  }
}

const date = (state, action) => {
  if (!state) {
    return {
      value: moment().format(),
      view: 'MONTH'
    }
  }
  switch (action.type) {
    case VIEW_TODAY :
      return Object.assign({}, state, {
        value: moment().format(),
      })
    case VIEW_NEXT:
      return Object.assign({}, state, {
        value: getNextViewDelta(state),
      })
    case VIEW_PREV:
      return Object.assign({}, state, {
        value: getPrevViewDelta(state),
      })
    case CHANGE_WINDOW:
      return Object.assign({}, state, {
        view: action.view,
      })
    default:
      return state
  }
}

export default date
