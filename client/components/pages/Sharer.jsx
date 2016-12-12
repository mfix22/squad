import React from 'react'

import Base from './Base'
import Confirmation from '../Confirmation'

const Sharer = ({ location, params }) => (
  <Base params={params} location={location}>
    <Confirmation location={location} params={params} />
  </Base>
)

export default Sharer
