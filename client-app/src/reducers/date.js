import moment from 'moment'
const VIEW_TODAY = 'VIEW_TODAY';
const VIEW_NEXT_WEEK = 'VIEW_NEXT_WEEK';
const VIEW_PREV_WEEK = 'VIEW_PREV_WEEK';
const VIEW_NEXT_MONTH = 'VIEW_NEXT_MONTH';
const VIEW_PREV_MONTH = 'VIEW_PREV_MONTH';

const date = (state = moment().format(), action) => {
  switch (action.type) {
    case VIEW_TODAY :
      return moment().format();
    case VIEW_NEXT_WEEK:
      return state.date.clone().add(1, 'w')
    case VIEW_PREV_WEEK:
      return state.date.clone().subtract(1, 'w')
    case VIEW_NEXT_MONTH:
      return state.date.clone().add(1, 'm')
    case VIEW_PREV_MONTH:
      return state.date.clone().subtract(1, 'm')
    default:
      return state
  }
}

export default date
