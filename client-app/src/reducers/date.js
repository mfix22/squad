import moment from 'moment'
const VIEW_TODAY = 'VIEW_TODAY';
const VIEW_NEXT_WEEK = 'VIEW_NEXT_WEEK';
const VIEW_PREV_WEEK = 'VIEW_PREV_WEEK';
const VIEW_NEXT_MONTH = 'VIEW_NEXT_MONTH';
const VIEW_PREV_MONTH = 'VIEW_PREV_MONTH';

const date = (state, action) => {
  if (!state) return moment().format();

  switch (action.type) {
    case VIEW_TODAY :
      return moment().format();
    case VIEW_NEXT_WEEK:
      return moment(state).add(1, 'w').format()
    case VIEW_PREV_WEEK:
      return moment(state).subtract(1, 'w').format()
    case VIEW_NEXT_MONTH:
      return moment(state).add(1, 'M').format()
    case VIEW_PREV_MONTH:
      return moment(state).subtract(1, 'M').format()
    default:
      return state
  }
}

export default date
