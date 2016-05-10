import React, { PropTypes } from 'react'

export default function Menu (props) {
  return (
    <div className='menu'>
      <div id='timer' className='timer' onClick={props.switchMode.bind(null, 'Timer')}>{'Timer'}</div>
      <div id='tabata' className='tabata' onClick={props.switchMode.bind(null, 'Tabata')}>{'Tabata'}</div>
      <div id='emom' className='emom' onClick={props.switchMode.bind(null, 'EMOM')}>{'EMOM'}</div>
    </div>
    )
}

Menu.propTypes = {
  switchMode: PropTypes.func.isRequired,
}
