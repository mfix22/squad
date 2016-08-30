import React from 'react'

let ColorPickerModule = React.createClass({

  render: function() {
    return (
      <div className="module color">
        <div className="module-container">
          <div className="color-module">
            <h2>Choose Event Color</h2><br/>
          </div>
        </div>
      </div>
    );
  }
});

export default ColorPickerModule
