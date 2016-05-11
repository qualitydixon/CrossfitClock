import React, { PropTypes } from 'react'
import SelectFrame from './SelectFrame'

TabataControls.propTypes = {
  shift: PropTypes.func.isRequired,
  tabataWork: PropTypes.number.isRequired,
  tabataRest: PropTypes.number.isRequired,
}

export default function TabataControls (props) {
  return (
    <div style={{marginRight: 20 + 'px'}}>
      <SelectFrame
        shift={props.shift}
        currentValue={props.tabataWork}
        tabata={true}
        delta={10}
        title='Work' />
      <SelectFrame
        shift={props.shift}
        tabata={true}
        currentValue={props.tabataRest}
        delta={10}
        title='Rest' />
    </div>
  )
}
