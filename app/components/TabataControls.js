import React from 'react'
import PropTypes from 'prop-types'
import SelectFrame from './SelectFrame'

TabataControls.propTypes = {
  shift: PropTypes.func.isRequired,
  tabataWork: PropTypes.number.isRequired,
  tabataRest: PropTypes.number.isRequired,
}

export default function TabataControls(props) {
  return (
    <div style={{ marginRight: 20 + 'px' }}>
      <SelectFrame
        shift={props.shift}
        currentValue={props.tabataWork}
        isTabata={true}
        delta={10}
        title="Work"
      />
      <SelectFrame
        shift={props.shift}
        isTabata={true}
        currentValue={props.tabataRest}
        delta={10}
        title="Rest"
      />
    </div>
  )
}
