import axios from 'axios'

const client = axios.create({
  baseURL:'http://api.squadup.io',
  responseType: 'json'
})

function fetchEvents() {
  return function(dispatch) {
    return client.get('/events').then((response) => {
      console.log(response);
      return dispatch({
        type : 'RECEIVE_EVENTS',
        events : response.data
      })
    }).catch((err) => {
      return dispatch({
        type : 'ERROR',
        err
      })
    })
  }
}

export { fetchEvents }
