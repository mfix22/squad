import React from 'react'
import { connect } from 'react-redux'
import GooglePlaceAutocomplete from 'googlePlaceAutocomplete'

import { CHANGE_LOCATION } from '../actions'

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
        {...this.props}
        searchText={this.state.value}
        onChange={this.handleChange}
        onNewRequest={this.props.onNewRequest}
        name={'location'}
      />
    )
  }
}


const mapDispatchToProps = dispatch => ({
  onNewRequest: (location) => {
    dispatch({
      type: CHANGE_LOCATION,
      location: location.description
    })
  }
})

export default connect(null, mapDispatchToProps)(PlaceAutocomplete)
