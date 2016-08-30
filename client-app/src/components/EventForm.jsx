import React from 'react'
import '../styles/form'

// import '../vendor/cal-form.js'

let EventForm = React.createClass({
  componentDidMount : function() {
    console.log('Mounted');
    require('../vendor/cal-form.js')();
  },

  render: function() {
    return (
      <div className="form-container focus">
        <i className="ion-checkmark success"></i>
        <div className="module color">
          <div className="module-container">
            <div className="color-module">
              <h2>Choose Event Color</h2><br/>
            </div>
          </div>
        </div>
        <div className="cal-form-submit">
          <i className="ion-checkmark"></i>
        </div>

        <div className="cal-form-buttons what-button">
          <div id="sentence" className="sentence what-button-text" contentEditable="true" placeholder="[ TYPE CALENDAR INFO HERE ]"></div>
        </div>
        <div className="cal-form-buttons cal-form-bottom-buttons when-button">
          <div className="form-times startDate"></div>
          <div className="form-times endDate"></div>
          <div className="form-times startTime"></div>
          <div className="form-times endTime"></div>
        </div>
        <div className="cal-form-buttons cal-form-bottom-buttons">
          <div className="with-button">
            <div className="with-button-node add">
              <i className="ion-person-add"></i>
            </div>
          </div>
        </div>
        <div className="cal-form-buttons cal-form-bottom-buttons">
          <div className="where-button">
            <h6 className="where-button-text"></h6>
            <i className="ion-android-pin"></i>
            <input placeholder="YOUR LOCATION HERE"type="text" size="30" className="location-input"/>
          </div>
        </div>
      </div>
    );
  }
});

export default EventForm
