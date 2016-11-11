import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import App from './components/App'
import configureStore from './helpers/configureStore'
import { fetchEvents } from './api'

injectTapEventPlugin();

const store = configureStore();
store.dispatch(fetchEvents);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#008042",
    accent1Color: "#008042",
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
