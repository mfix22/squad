import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DropDownMenu from 'material-ui/DropDownMenu';
import { ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import NextButton from '../buttons/NextButton'
import PrevButton from '../buttons/PrevButton'
import TodayButton from '../buttons/TodayButton'

const ControlBar = ({ referenceDate }) => (
  <div className="controlBar">
    <div className="refDateHeaderWrapper">
      <ToolbarTitle style={{ fontSize : '16px' }} className="refDateHeader" text={moment(referenceDate).format("MMMM YYYY")}/>
    </div>
    <ToolbarTitle style={{ fontSize : '16px', fontWeight: "bold" }} className="rangeHeader" text="11/5 - 11/7" />
    <div className="buttonContainer">
      <DropDownMenu value={"4_DAY"} onChange={(event, index, value) => console.log(value)}>
        <MenuItem value={"4_DAY"} primaryText="4 Day" />
        <MenuItem value={"WEEK"} primaryText="Week" />
        <MenuItem value={"2_WEEK"} primaryText="2 Week" />
        <MenuItem value={"MONTH"} primaryText="Month" />
      </DropDownMenu>
      <PrevButton />
      <TodayButton />
      <NextButton />
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    referenceDate : state.date
  }
}

export default connect(mapStateToProps)(ControlBar)
