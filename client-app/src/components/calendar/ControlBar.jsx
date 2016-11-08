import React from 'react'

import NextButton from '../buttons/NextButton'
import PrevButton from '../buttons/PrevButton'
import TodayButton from '../buttons/TodayButton'

const ControlBar = () => (
  <div className="controlBar">
    <PrevButton />
    <TodayButton />
    <NextButton />
  </div>
)

export default ControlBar
