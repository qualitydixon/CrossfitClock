import React, { PropTypes } from 'react'

SelectFrame.propTypes = {
  shift: PropTypes.func.isRequired,
  roundMode: PropTypes.bool.isRequired,
  currentValue: PropTypes.number.isRequired,
  tabata: PropTypes.bool.isRequired,
  title: PropTypes.string,
  delta: PropTypes.number.isRequired,
}

export default function SelectFrame (props) {
  let display = 0
  if (props.roundMode) {
    display = props.currentValue
  } else if (props.tabata) {
    display = ':' + props.currentValue
  } else {
    display = Math.floor(props.currentValue / 60)
  }
  return (
    <div className='selectContainer'>
      {props.title && <div>{props.title}</div>}
      <div className='select'>
        <button id='minus' className='btn glyphicon glyphicon-minus' onClick={props.shift.bind(null, -props.delta, props.roundMode, props.title)}></button>
        <div className='currentlySelected'> {display} </div>
        <button id='plus' className='btn glyphicon glyphicon-plus' onClick={props.shift.bind(null, props.delta, props.roundMode, props.title)}></button>
      </div>
    </div>)
}
