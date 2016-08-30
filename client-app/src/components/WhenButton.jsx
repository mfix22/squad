import React from 'react'

let WhenButton = React.createClass({

  render: function() {
    return (
      <div className="cal-form-buttons cal-form-bottom-buttons when-button">
        <div className="form-times startDate"></div>
        <div className="form-times endDate"></div>
        <div className="form-times startTime"></div>
        <div className="form-times endTime"></div>
      </div>
    );
  }
});

export default WhenButton
