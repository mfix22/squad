import React from 'react'
import Calendar from './Calendar'
import NextButton from './Buttons/NextButton'
import PrevButton from './Buttons/PrevButton'

const App = () => (
  <div>
    <PrevButton/>
    <NextButton/>
    <Calendar />
  </div>
)

export default App
