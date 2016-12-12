import React from 'react'
import Base from './Base'

import ErrorPopUp from '../ErrorPopUp'

const Scheduler = ({ params }) => (
  <Base params={params}><ErrorPopUp /></Base>
)

export default Scheduler
