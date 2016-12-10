import React from 'react'
import GooglePlaceAutocomplete from 'googlePlaceAutocomplete'

class PlaceAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleNewRequest(location) {
    this.setState({
      value: location.description
    })
  }

  render() {
    return (
      <GooglePlaceAutocomplete
        {...this.props}
        searchText={this.state.value}
        onChange={this.handleChange}
        onNewRequest={this.handleNewRequest}
        name={'location'}
      />
    )
  }
}

export default PlaceAutocomplete
