import React, { PropTypes, Component } from 'react'
import cx from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faAngleDoubleUp,
} from '@fortawesome/fontawesome-free-solid'
import SelectFrame from './SelectFrame'
import TabataControls from './TabataControls'
import Menu from './Menu'
import { formatTime } from '../helpers/utils'

const { func, bool, string, number, object } = PropTypes

const Play = ({ playing, togglePlay }) => {
  const className = ''
  return (
    <button id="play" className={className} onClick={togglePlay}>
      <FontAwesomeIcon icon={playing ? faPause : faPlay} />
    </button>
  )
}

Play.propTypes = {
  playing: bool.isRequired,
  togglePlay: func.isRequired,
}

const Refresh = ({ reset }) => (
  <button
    id="reset"
    className="btn reset glyphicon glyphicon-refresh"
    onClick={reset}
  />
)

Refresh.propTypes = {
  reset: func.isRequired,
}

const ToggleCount = ({ isCountingUp, toggleDirection }) => {
  const className =
    'glyphicon glyphicon-chevron-down' + (isCountingUp ? ' flip' : ' unflip')
  return (
    <button className="btn up" onClick={toggleDirection}>
      <i className={className} />
    </button>
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
        title="Rounds"
      />
      <div className="elapsed">
        <div>{'Completed'}</div>
        <div className="currentlySelected">{roundsElapsed}</div>
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

export default class Home extends Component {
  render() {
    const {
      mode,
      switchMode,
      totalSeconds,
      tabataWork,
      tabataRest,
      shift,
      playing,
      isCountingUp,
      selectedTime,
      rounds,
      shiftRounds,
      roundsElapsed,
      togglePlay,
      toggleDirection,
      reset,
    } = this.props
    const shouldAnimate = totalSeconds <= 5 && playing && !isCountingUp
    const tattlerClass = cx('tattler', { alertAnimation: shouldAnimate })
    const { minutes, seconds } = formatTime(totalSeconds)
    return (
      <div>
        <Menu switchMode={switchMode} mode={mode} />
        <div className="main">
          <div className={tattlerClass}>
            {minutes}
            <span className="colon">:</span>
            {seconds}
          </div>
          <div className="controlsContainer">
            <div className="controls">
              {mode === 'Tabata' && (
                <TabataControls
                  tabataWork={tabataWork}
                  tabataRest={tabataRest}
                  shift={shift}
                />
              )}
              {mode === 'Timer' && (
                <SelectFrame
                  shift={shift}
                  currentValue={selectedTime}
                  delta={60}
                  title="Minutes"
                />
              )}
              {mode !== 'Timer' && (
                <Rounds
                  shiftRounds={shiftRounds}
                  rounds={rounds}
                  roundsElapsed={roundsElapsed}
                  style={{ marginLeft: '40px' }}
                />
              )}
            </div>
            <div className="timerControls">
              <Play togglePlay={togglePlay} playing={playing} />
              <Refresh reset={reset} />
              {mode === 'Timer' && (
                <ToggleCount
                  isCountingUp={isCountingUp}
                  toggleDirection={toggleDirection}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
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
