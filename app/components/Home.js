import React, { PropTypes } from 'react'
import SelectFrame from './SelectFrame'
import Menu from './Menu'

const Play = (props) => {
  const className = 'btn play glyphicon glyphicon-' + (props.playing ? 'pause' : 'play')
  return (
    <button id='play' className={className} onClick={props.togglePlay}></button>
  )
}

const Refresh = (props) => <button id='reset' className='btn reset glyphicon glyphicon-refresh' onClick={props.reset}></button>

const ToggleCount = (props) => {
  const className = 'btn up glyphicon glyphicon-chevron-' + (props.countDirection ? 'up' : 'down')
  return (
    <button className={className} onClick={props.toggleDirection}></button>
  )
}

const RoundsElapsed = (props) => {
  return (
    <div className='elapsed'>
      <div>{'Completed'}</div>
      <div className='currentlySelected'>{props.roundsElapsed}</div>
    </div>)
}

const TabataControls = (props) => {
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

const Rounds = (props) => {
  return (
    <div>
      <SelectFrame
        shift={props.shift}
        currentValue={props.rounds}
        roundMode={true}
        delta={1}
        title='Rounds' />
      <RoundsElapsed roundsElapsed={props.roundsElapsed}/>
    </div>
  )
}

const Home = (props) => {
  // Add animation class when timer is at 5 seconds or less
  const tattlerClass = 'tattler ' + ((props.seconds <= 5 && props.playing) ? 'alertAnimation' : '')
  return (
    <div>
        <Menu switchMode={props.switchMode} mode={props.mode} />
        <div className='main'>
          <div className={tattlerClass}>{props.timeString(props.seconds)}</div>
          <div className='controls'>
            <div className='controlsContainer'>
              {props.mode === 'Tabata' && <TabataControls
                                          tabataWork={props.tabataWork}
                                          tabataRest={props.tabataRest}
                                          shift={props.shift} />}
              {props.mode === 'Timer' && <SelectFrame
                                        shift={props.shift}
                                        currentValue={props.selectedTime}
                                        delta={60}
                                        title='Minutes' />}
              {props.mode !== 'Timer' && <Rounds
                                         shift={props.shift}
                                         rounds={props.rounds}
                                         roundsElapsed={props.roundsElapsed} />}
            </div>
            <div className='timerControls'>
              <Play togglePlay={props.togglePlay} playing={props.playing} />
              <Refresh reset={props.reset}/>
              {props.mode === 'Timer' && <ToggleCount
                                         countDirection={props.countDirection}
                                         toggleDirection={props.toggleDirection}/>}
            </div>
          </div>
        </div>
      </div>
  )
}

module.exports = Home
