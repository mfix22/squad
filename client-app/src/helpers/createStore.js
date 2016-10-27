import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';


const createStore = () => {
  createStore(reducer, fakeState, applyMiddleware(thunk, createLogger()))
}
export default createStore
