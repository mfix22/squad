import React from 'react'
import Base from './Base'

const Scheduler = ({ params, children }) => (
  <Base params={params}>{children}</Base>
)

export default Scheduler
