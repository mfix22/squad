const CHANGE_VIEW = 'CHANGE_VIEW';

const view = (state, action) => {
  if (!state) return "4_DAY";
  switch (action.type) {
    case CHANGE_VIEW:
      return action.view
    default:
    return state;
  }
}

export default view;
