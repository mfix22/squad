import React from 'react'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

const style = {
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    margin: '4px',
  }
}

class TextFieldWithList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      items: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit(event) {
    const arr = this.state.items;
    arr.push(this.state.value);

    this.setState({
      items: arr,
      value: ''
    })

    event.preventDefault()
  }

  handleChipDelete(index) {
    console.log(index)
    const arr = this.state.items
    arr.splice(index, 1)
    this.setState({
      items: arr
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText={this.props.hint}
            floatingLabelText={this.props.label}
            floatingLabelFixed
            value={this.state.value}
            onChange={this.handleChange}
            style={{ display: 'block' }}
          />
          <input style={{ display: 'none' }} type="submit" value="Submit" />
        </form>
        <div style={style.list}>
          {this.state.items.map((item, index) => {
            console.log(this.state.items)
            return <Chip key={index} style={style.item} onRequestDelete={() => this.handleChipDelete(index)}>{item}</Chip>
          })}
        </div>
      </div>
    )
  }
}

export default TextFieldWithList
