import React from 'react'

let WithButton = React.createClass({

  render: function() {
    return (
      <div className="cal-form-buttons cal-form-bottom-buttons">
        <div className="with-button">
          <div className="with-button-node add">
            <i className="ion-person-add"></i>
          </div>
        </div>
      </div>
    );
  }
});

export default WithButton
