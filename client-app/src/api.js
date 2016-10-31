import axios from 'axios'

function fetchEvents() {
  return function(dispatch) {
    return axios.get('http://api.squadup.io/events').then((response) => {
      console.log(response);
      return dispatch({
        type : 'RECEIVE_EVENTS',
        events : response.data
      })
    }).catch((err) => {
      throw err;
    })
  }
}

export { fetchEvents }
