import React from 'react'
import Calendar from './Calendar'
import NextButton from './Buttons/NextButton'
import PrevButton from './Buttons/PrevButton'
import TodayButton from './Buttons/TodayButton'

const App = () => (
  <div>
    <PrevButton/>
    <TodayButton/>
    <NextButton/>
    <Calendar />
  </div>
)

export default App
