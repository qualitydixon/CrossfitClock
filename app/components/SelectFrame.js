import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/fontawesome-free-solid'

const { func, bool, number, string } = PropTypes

SelectFrame.propTypes = {
  shift: func.isRequired,
  isRounds: bool,
  isTabata: bool,
  title: string,
  delta: number.isRequired,
  currentValue: number.isRequired,
}

export default function SelectFrame(props) {
  let display = 0
  if (props.isRounds || props.isTabata) {
    display = props.currentValue
  } else {
    display = Math.floor(props.currentValue / 60)
  }
  return (
    <div className="selectContainer">
      {props.title && <div className="frameTitle">{props.title}</div>}
      <div className="select">
        <button
          id="minus"
          className="btn"
          onClick={props.shift.bind(
            null,
            -props.delta,
            props.isRounds,
            props.title,
          )}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div className="currentlySelected"> {display} </div>
        <button
          id="plus"
          className="btn"
          onClick={props.shift.bind(
            null,
            props.delta,
            props.isRounds,
            props.title,
          )}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  )
}
