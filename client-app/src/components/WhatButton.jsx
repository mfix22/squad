import React from 'react'

let WhatButton = React.createClass({

  render: function() {
    return (
      <div className="cal-form-buttons what-button">
        <div id="sentence" className="sentence what-button-text" contentEditable="true" placeholder="[ TYPE CALENDAR INFO HERE ]"></div>
      </div>
    );
  }
});

export default WhatButton
