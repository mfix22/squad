import React from 'react'
import GooglePlaceAutocomplete from 'googlePlaceAutocomplete'

class PlaceAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    return (
      <GooglePlaceAutocomplete
        searchText={this.state.value}
        hintText={'Location'}
        onChange={this.handleChange}
        onNewRequest={() => {}}
        name={'location'}
      />
    )
  }
}

export default PlaceAutocomplete
