import React, { PropTypes } from 'react'
import SelectFrame from './SelectFrame'
import TabataControls from './TabataControls'
import Menu from './Menu'

const Play = (props) => {
  const className = 'btn play glyphicon glyphicon-' + (props.playing ? 'pause' : 'play')
  return (
    <button id='play' className={className} onClick={props.togglePlay}></button>
  )
}

Play.propTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
}

const Refresh = ({ reset }) => <button id='reset' className='btn reset glyphicon glyphicon-refresh' onClick={reset}></button>

Refresh.propTypes = {
  reset: PropTypes.func.isRequired,
}

const ToggleCount = (props) => {
  const className = 'btn up glyphicon glyphicon-chevron-' + (props.countDirection ? 'up' : 'down')
  return (
    <button className={className} onClick={props.toggleDirection}></button>
  )
}

ToggleCount.propTypes = {
  countDirection: PropTypes.bool.isRequired,
  toggleDirection: PropTypes.func.isRequired,
}

const RoundsElapsed = (props) => {
  return (
    <div className='elapsed'>
      <div>{'Completed'}</div>
      <div className='currentlySelected'>{props.roundsElapsed}</div>
    </div>)
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

function Home (props) {
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

Home.propTypes = {
  mode: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  roundsElapsed: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
}

module.exports = Home
