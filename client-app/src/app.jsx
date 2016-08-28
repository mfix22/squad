import ReactDOM from 'react-dom';
import EventForm from './components/EventForm';
module.exports = function() {
  ReactDOM.render(
    <EventForm/>,
    document.getElementById('form')
  );
}
