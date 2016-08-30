import React from 'react'
import '../../assets/styles/form'
import WhatButton from './WhatButton'
import WhereButton from './WhereButton'
import WhenButton from './WhenButton'
import WithButton from './WithButton'
import ColorPickerModule from './ColorPickerModule'



// import '../vendor/cal-form.js'

let EventForm = React.createClass({
  componentDidMount : function() {
    console.log('Mounted');
    require('../../assets/scripts/cal-form.js')();
  },

  render: function() {
    return (
      <div className="form-container focus">
        <i className="ion-checkmark success"></i>
        <div className="cal-form-submit">
          <i className="ion-checkmark"></i>
        </div>
        <ColorPickerModule/>
        <WhatButton/>
        <WhenButton/>
        <WithButton/>
        <WhereButton/>
      </div>
    );
  }
});

export default EventForm
