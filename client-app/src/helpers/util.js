import moment from 'moment'

export const chunk = (a, c) => {
  return a.reduce((accum, next, i) => {
    const intI = Math.floor(i / c)
    return Object.assign([], accum, {
      [intI] : [...accum[intI], next]
    })
  }, Array(Math.ceil(a.length / c)).fill([]))
}

export const isThisMonth = (refDate, otherDate) => {
  const ref = moment(refDate);
  const day = moment(otherDate);
  return ref.month() === day.month() && ref.year() === day.year()
}

const defaultNumDays = 35;

export function getDays(refDate, numDays=defaultNumDays) {
  if (numDays <= 10) return [...Array(numDays).keys()].map((offset) => moment(refDate).day(offset).format())
  const numWeeks = Math.ceil(numDays / 7);
  const correctedNumDays = numWeeks * 7

  // chunks days into week arrays of day arrays
  return [...Array(correctedNumDays).keys()].map(i => i - moment(refDate).date())
                                   .map(offset => moment(refDate).day(offset).format())
}

export function getChunkedDays(refDate, numDays=defaultNumDays) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  const days = getDays(refDate, numDays);
  if (numDays <= 10) return [days]
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}
