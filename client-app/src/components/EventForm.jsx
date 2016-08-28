import React from 'react'
import '../styles/form'

let EventForm = React.createClass({
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
        <div className="row">
          <div className="cal-form-buttons what-button flex-center col-xs-12 text-center">
            <div id="sentence" className="sentence what-button-text" contentEditable="true" placeholder="[ TYPE CALENDAR INFO HERE ]"></div>
          </div>
        </div>
        <div className="row">
          <div className="cal-form-buttons cal-form-bottom-buttons col-xs-4 text-center">
            <div className="row">
              <div className="col-xs-6  form-times startDate"></div>
              <div className="col-xs-6  form-times endDate"></div>
            </div>
            <div className="row">
              <div className="col-xs-6  form-times startTime"></div>
              <div className="col-xs-6  form-times endTime"></div>
            </div>
          </div>
          <div className="cal-form-buttons cal-form-bottom-buttons col-xs-4 text-center">
            <div className="with-button">
              <div className="with-button-node add">
                <i className="ion-person-add"></i>
              </div>
            </div>
          </div>
          <div className="cal-form-buttons cal-form-bottom-buttons col-xs-4 text-center">
            <div className="where-button">
              <h6 className="where-button-text"></h6>
              <i className="ion-android-pin"></i>
              <input placeholder="YOUR LOCATION HERE"type="text" size="30" className="location-input"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default EventForm
