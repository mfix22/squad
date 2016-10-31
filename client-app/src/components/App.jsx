import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Calendar from './Calendar'
import NextButton from './Buttons/NextButton'
import PrevButton from './Buttons/PrevButton'
import TodayButton from './Buttons/TodayButton'

const App = () => (
  <MuiThemeProvider>
    <PrevButton/>
    <TodayButton/>
    <NextButton/>
    <Calendar />
  </MuiThemeProvider>
)

export default App
