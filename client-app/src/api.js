import axios from 'axios'

axios.defaults.baseURL = 'http://api.squadup.io';

function fetchEvents() {
  return function(dispatch) {
    return axios.get('/events').then((response) => {
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
