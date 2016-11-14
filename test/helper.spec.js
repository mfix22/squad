import { expect } from 'chai'
import moment from 'moment'
import { chunk, getDays, getChunkedDays, isThisMonth, getOrderedMonthArray} from '../client-app/src/helpers/util'

describe('Chunk Array', function() {
  it('Creates array of array with length X (with remainder)', () => {
		const array = [1,2,3,4,5,6,7,8,9,10]
		expect(chunk(array, 3)).to.deep.equal([[1,2,3], [4,5,6], [7,8,9], [10]])
  });
  it('Gets list of day with refDate in relative week position if numDays < 10', () => {
    const days = getDays(moment('2016-11-11T15:11:50-06:00').format(), 7)
		expect(days).to.deep.equal([
                            '2016-11-06T15:11:50-06:00',
                            '2016-11-07T15:11:50-06:00',
                            '2016-11-08T15:11:50-06:00',
                            '2016-11-09T15:11:50-06:00',
                            '2016-11-10T15:11:50-06:00',
                            '2016-11-11T15:11:50-06:00',
                            '2016-11-12T15:11:50-06:00'
                          ])
  });
  it('Gets list of day with refDate in relative month position if numDays > 10', () => {
    const days = getDays(moment('2016-11-11T15:11:50-06:00').format()) //numDays defaults to 35
		expect(days).to.deep.equal( [
                                  '2016-10-26T15:11:50-05:00',
                                  '2016-10-27T15:11:50-05:00',
                                  '2016-10-28T15:11:50-05:00',
                                  '2016-10-29T15:11:50-05:00',
                                  '2016-10-30T15:11:50-05:00',
                                  '2016-10-31T15:11:50-05:00',
                                  '2016-11-01T15:11:50-05:00',
                                  '2016-11-02T15:11:50-05:00',
                                  '2016-11-03T15:11:50-05:00',
                                  '2016-11-04T15:11:50-05:00',
                                  '2016-11-05T15:11:50-05:00',
                                  '2016-11-06T15:11:50-06:00',
                                  '2016-11-07T15:11:50-06:00',
                                  '2016-11-08T15:11:50-06:00',
                                  '2016-11-09T15:11:50-06:00',
                                  '2016-11-10T15:11:50-06:00',
                                  '2016-11-11T15:11:50-06:00',
                                  '2016-11-12T15:11:50-06:00',
                                  '2016-11-13T15:11:50-06:00',
                                  '2016-11-14T15:11:50-06:00',
                                  '2016-11-15T15:11:50-06:00',
                                  '2016-11-16T15:11:50-06:00',
                                  '2016-11-17T15:11:50-06:00',
                                  '2016-11-18T15:11:50-06:00',
                                  '2016-11-19T15:11:50-06:00',
                                  '2016-11-20T15:11:50-06:00',
                                  '2016-11-21T15:11:50-06:00',
                                  '2016-11-22T15:11:50-06:00',
                                  '2016-11-23T15:11:50-06:00',
                                  '2016-11-24T15:11:50-06:00',
                                  '2016-11-25T15:11:50-06:00',
                                  '2016-11-26T15:11:50-06:00',
                                  '2016-11-27T15:11:50-06:00',
                                  '2016-11-28T15:11:50-06:00',
                                  '2016-11-29T15:11:50-06:00'
                                ])
  });
});

describe('Date Comparisons', function() {
  it('Decides if specified date is this month', () => {
    const refDate = moment("2016-11-30");
    const sameMonth = refDate.clone().add(-1, 'd').format();
    const nextMonth = refDate.clone().add(1, 'd').format()
		expect(isThisMonth(refDate.format(), sameMonth)).to.be.true;
    expect(isThisMonth(refDate.format(), nextMonth)).to.be.false;
  });
});


describe('Get ordered months', function () {
  it('Gets next 12 months including current month', () => {
    const date = "2016-10-26";
    expect(getOrderedMonthArray(date).map(moment => moment.month())).to.deep.equal([
      9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8
    ])
  })
})
