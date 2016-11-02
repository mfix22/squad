const { expect } = require('chai')
const configureStore = require('../client-app/src/helpers/configureStore')
const moment = require('moment')

const VIEW_TODAY = 'VIEW_TODAY';
const VIEW_NEXT_WEEK = 'VIEW_NEXT_WEEK';
const VIEW_PREV_WEEK = 'VIEW_PREV_WEEK';
const VIEW_NEXT_MONTH = 'VIEW_NEXT_MONTH';
const VIEW_PREV_MONTH = 'VIEW_PREV_MONTH';

const store = configureStore();

describe('Dispatch VIEW_TODAY', function() {
  it('changes refDate to today', () => {
		store.dispatch({
			type : VIEW_TODAY
		});
		expect(store.getState().date).to.equal(moment().format())
  });
});
