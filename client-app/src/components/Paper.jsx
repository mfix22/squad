import React from 'react'
import Paper from 'material-ui/Paper'

const PaperExampleSimple = ({ style, children }) => (
  <Paper style={Object.assign(styles, style)} zDepth={1}>
    {children}
  </Paper>
)

const styles = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'flex',
}

export default PaperExampleSimple
