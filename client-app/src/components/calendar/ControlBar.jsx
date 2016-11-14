import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import NextButton from '../Buttons/NextButton'
import PrevButton from '../Buttons/PrevButton'
import TodayButton from '../Buttons/TodayButton'
import { getOrderedMonthArray, getNumDaysInView, getDays } from '../../helpers/util'
import { color } from '../../vars'

const formatCenterHeader = (date) => {
  const days = getDays(date.value, getNumDaysInView(date.view));
  return `${moment(days[0]).format('M/D')} - ${moment(days[days.length - 1]).format('M/D')}`
}

const iconStyle = {
  fill: color.green
}

const ControlBar = ({ referenceDate, onChange, viewChoice, header }) => (
  <Toolbar className="controlBar">
    <ToolbarGroup firstChild className="refDateHeaderWrapper">
      <DropDownMenu value={0} iconStyle={iconStyle} onChange={() => {}}>
        {getOrderedMonthArray(referenceDate).map((month, index) => {
          return <MenuItem key={index} value={index} primaryText={month.format("MMMM YYYY")} />
        })}
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarTitle
      style={{ fontSize : '14px', fontWeight: "bold" }}
      className="rangeHeader"
      text={header}
    />
    <div className="buttonContainer">
      <DropDownMenu iconStyle={iconStyle} value={viewChoice} onChange={onChange}>
        <MenuItem value="4_DAY" primaryText="4 Day" />
        <MenuItem value="WEEK" primaryText="Week" />
        <MenuItem value="MONTH" primaryText="Month" />
      </DropDownMenu>
      <PrevButton />
      <TodayButton disabled={moment(referenceDate).isSame(moment(), 'day')}/>
      <NextButton />
    </div>
  </Toolbar>
)

const mapStateToProps = (state) => {
  return {
    referenceDate: state.date.value,
    viewChoice : state.date.view,
    header : formatCenterHeader(state.date)
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
