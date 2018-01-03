import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faPause,
  faAngleDoubleUp,
  faUndoAlt,
} from '@fortawesome/fontawesome-free-solid'
import SelectFrame from './SelectFrame'
import TabataControls from './TabataControls'
import Menu from './Menu'
import { formatTime } from '../helpers/utils'

const { func, bool, string, number, object } = PropTypes

const Play = ({ playing, togglePlay }) => {
  return (
    <button className="btnTimer" onClick={togglePlay}>
      <FontAwesomeIcon icon={playing ? faPause : faPlay} />
    </button>
  )
}

Play.propTypes = {
  playing: bool.isRequired,
  togglePlay: func.isRequired,
}

const Refresh = ({ reset }) => (
  <button className="btnTimer" onClick={reset}>
    <FontAwesomeIcon icon={faUndoAlt} />
  </button>
)

Refresh.propTypes = {
  reset: func.isRequired,
}

const ToggleCount = ({ isCountingUp, toggleDirection }) => {
  const className = isCountingUp ? ' flip' : ' unflip'
  return (
    <button className="btnTimer" onClick={toggleDirection}>
      <FontAwesomeIcon className={className} icon={faAngleDoubleUp} />
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
        <div className="elapsedTitle">{'Completed'}</div>
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
          <div className="bigTimer">
            <button className={tattlerClass} onClick={togglePlay}>
              {minutes}
              <span className="colon">:</span>
              {seconds}
            </button>
            <div className="timerControls">
              <Play togglePlay={togglePlay} playing={playing} />
              <Refresh reset={reset} />
              {mode === 'Timer' ? (
                <ToggleCount
                  className="btnTimer"
                  isCountingUp={isCountingUp}
                  toggleDirection={toggleDirection}
                />
              ) : (
                <div className="btnTimer" />
              )}
            </div>
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
