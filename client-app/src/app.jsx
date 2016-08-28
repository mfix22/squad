import ReactDOM from 'react-dom';
import Test from './components/Test';
module.exports = function() {
  ReactDOM.render(
    <Test/>,
    document.getElementById('test')
  );
}
