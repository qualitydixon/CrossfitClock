import React, { PropTypes } from 'react'

const { func, bool, number, string, object } = PropTypes

SelectFrame.propTypes = {
  shift: func.isRequired,
  isRounds: bool,
  isTabata: bool,
  title: string,
  delta: number.isRequired,
  currentValue: number.isRequired,
}

export default function SelectFrame (props) {
  let display = 0
  if (props.isRounds) {
    display = props.currentValue
  } else if (props.isTabata) {
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
