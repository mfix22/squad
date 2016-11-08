import React from 'react'
import Paper from 'material-ui/Paper'

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'flex',
}

const PaperExampleSimple = (props) => (
  <Paper style={Object.assign(style, props.style)} zDepth={1} children={props.children}/>
)

export default PaperExampleSimple
