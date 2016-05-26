import React, { PropTypes } from 'react'
import SelectFrame from './SelectFrame'
import TabataControls from './TabataControls'
import Menu from './Menu'
import { formatTime } from '../helpers/utils'

const { func, bool, string, number, object } = PropTypes

const Play = ({ playing, togglePlay }) => {
  const className = 'btn play glyphicon glyphicon-' + (playing ? 'pause' : 'play')
  return (
    <button id='play' className={className} onClick={togglePlay}></button>
  )
}

Play.propTypes = {
  playing: bool.isRequired,
  togglePlay: func.isRequired,
}

const Refresh = ({ reset }) => <button id='reset' className='btn reset glyphicon glyphicon-refresh' onClick={reset}></button>

Refresh.propTypes = {
  reset: func.isRequired,
}

const ToggleCount = ({ isCountingUp, toggleDirection }) => {
  const className = 'btn up glyphicon glyphicon-chevron-' + (isCountingUp ? 'up' : 'down')
  return (
    <button className={className} onClick={toggleDirection}></button>
  )
}

ToggleCount.propTypes = {
  isCountingUp: bool.isRequired,
  toggleDirection: func.isRequired,
}

const Rounds = ({ style, shiftRounds, rounds, roundsElapsed }) => {
  return (
    <div style={style}>
      <SelectFrame
        shift={shiftRounds}
        currentValue={rounds}
        isRounds={true}
        delta={1}
        title='Rounds' />
        <div className='elapsed'>
          <div>{'Completed'}</div>
          <div className='currentlySelected'>{roundsElapsed}</div>
        </div>
    </div>
  )
}

Rounds.propTypes = {
  rounds: number.isRequired,
  shiftRounds: func.isRequired,
  roundsElapsed: number.isRequired,
  style: object,
}

function Home (props) {
  // Add animation class when timer is at 5 seconds or less
  const tattlerClass = 'tattler ' + ((props.seconds <= 5 && props.playing) ? 'alertAnimation' : '')
  return (
    <div>
      <Menu switchMode={props.switchMode} mode={props.mode} />
      <div className='main'>
          <div className={tattlerClass}>{formatTime(props.seconds)}</div>
          <div className='controlsContainer'>
            <div className='controls'>
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
                                         shiftRounds={props.shiftRounds}
                                         rounds={props.rounds}
                                         roundsElapsed={props.roundsElapsed}
                                         style={{marginLeft: '40px'}} />}
            </div>
            <div className='timerControls'>
              <Play togglePlay={props.togglePlay} playing={props.playing} />
              <Refresh reset={props.reset}/>
              {props.mode === 'Timer' && <ToggleCount
                                         isCountingUp={props.isCountingUp}
                                         toggleDirection={props.toggleDirection}/>}
            </div>
          </div>
        </div>
      </div>
  )
}

Home.propTypes = {
  shift: func.isRequired,
  shiftRounds: func.isRequired,
  switchMode: func.isRequired,
  togglePlay: func.isRequired,
  toggleDirection: func.isRequired,
  reset: func.isRequired,
  mode: string.isRequired,
  playing: bool.isRequired,
  isCountingUp: bool.isRequired,
  roundsElapsed: number.isRequired,
  tabataRest: number.isRequired,
  tabataWork: number.isRequired,
  rounds: number.isRequired,
  seconds: number.isRequired,
  selectedTime: number.isRequired,
}

module.exports = Home
