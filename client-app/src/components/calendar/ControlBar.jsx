import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import NextButton from '../Buttons/NextButton'
import PrevButton from '../Buttons/PrevButton'
import TodayButton from '../Buttons/TodayButton'
import { getOrderedMonthArray } from '../../helpers/util'

const ControlBar = ({ referenceDate, onChange, viewChoice }) => (
  <Toolbar className="controlBar">
    <ToolbarGroup firstChild className="refDateHeaderWrapper">
      <DropDownMenu value={0} onChange={() => {}}>
        {getOrderedMonthArray(referenceDate).map((month, index) => {
          return <MenuItem key={index} value={index} primaryText={month.format("MMMM YYYY")} />
        })}
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarTitle style={{ fontSize : '16px', fontWeight: "bold" }} className="rangeHeader" text="11/5 - 11/7" />
    <div className="buttonContainer">
      <DropDownMenu value={viewChoice} onChange={onChange}>
        <MenuItem value="4_DAY" primaryText="4 Day" />
        <MenuItem value="WEEK" primaryText="Week" />
        <MenuItem value="MONTH" primaryText="Month" />
      </DropDownMenu>
      <PrevButton />
      <TodayButton />
      <NextButton />
    </div>
  </Toolbar>
)

const mapStateToProps = (state) => {
  return {
    referenceDate: state.date.value,
    viewChoice : state.date.view,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange : (event, index, value) => {
      dispatch({
        type : 'CHANGE_WINDOW',
        view : value,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar)
