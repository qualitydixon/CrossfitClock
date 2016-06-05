import React, { PropTypes } from 'react'

export default function Menu (props) {
  const highlight = { color: '#FF3D00' }
  return (
    <div className='menu'>
      <div id='timer'
        className='timer'
        style={(props.mode === 'Timer') ? highlight : {}}
        onClick={() => props.switchMode('Timer')}>{'Timer'}</div>
      <div id='tabata'
        className='tabata'
        style={(props.mode === 'Tabata') ? highlight : {}}
        onClick={() => props.switchMode('Tabata')}>{'Tabata'}</div>
      <div id='emom'
        style={(props.mode === 'EMOM') ? highlight : {}}
        className='emom'
        onClick={() => props.switchMode('EMOM')}>{'EMOM'}</div>
    </div>
    )
}

Menu.propTypes = {
  switchMode: PropTypes.func.isRequired,
}
