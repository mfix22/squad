import React from 'react'

let WhereButton = React.createClass({

  render: function() {
    return (
      <div className="cal-form-buttons cal-form-bottom-buttons">
        <div className="where-button">
          <h6 className="where-button-text"></h6>
          <i className="ion-android-pin"></i>
          <input placeholder="YOUR LOCATION HERE"type="text" size="30" className="location-input"/>
        </div>
      </div>
    );
  }
});

export default WhereButton
