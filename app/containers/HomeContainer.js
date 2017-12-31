import React, { Component } from 'react'
import Home from '../components/Home'
const alert = require('file!../res/alert_beep.mp3')
const a = new Audio(alert)

export default class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 600,
      playing: false,
      isCountingUp: false,
      selectedTime: 600,
      rounds: 8,
      mode: 'Timer',
      roundsElapsed: 0,
      tabataWork: 20,
      tabataRest: 10,
      isWork: true, // true for 'work' and false for 'rest'
    }
  }
  togglePlay() {
    this.setState({
      playing: !this.state.playing,
    })
  }
  toggleDirection() {
    this.setState({
      isCountingUp: !this.state.isCountingUp,
    })
    if (!this.state.isCountingUp) {
      this.setState({ seconds: 0 })
    } else {
      this.setState({ seconds: this.state.selectedTime })
    }
  }
  tick() {
    const ticks = {
      Timer: () => this.tickTimer(),
      EMOM: () => this.tickEMOM(),
      Tabata: () => this.tickTabata(),
    }

    if (this.state.playing) {
      if (
        this.state.seconds <= 5 &&
        this.state.seconds > 0 &&
        !this.state.isCountingUp
      ) {
        this.playSound()
      }
      ticks[this.state.mode]()
    }
  }
  // The following three tick functions establish the logic for rounds, end conditions, etc.
  tickTimer() {
    if (this.state.seconds > 0 && !this.state.isCountingUp) {
      this.setState({ seconds: this.state.seconds - 1 })
    } else if (
      this.state.seconds < this.state.selectedTime &&
      this.state.isCountingUp
    ) {
      this.setState({ seconds: this.state.seconds + 1 })
    } else {
      this.finished()
    }
  }
  tickTabata() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 })
    } else if (
      !this.state.isWork &&
      this.state.rounds === this.state.roundsElapsed + 1
    ) {
      this.setState({ roundsElapsed: this.state.roundsElapsed + 1 })
      this.finished()
    } else {
      this.setState({ isWork: !this.state.isWork })
      if (this.state.isWork) {
        this.setState({
          seconds: this.state.tabataWork,
          roundsElapsed: this.state.roundsElapsed + 1,
        })
      } else {
        this.setState({
          seconds: this.state.tabataRest,
        })
      }
    }
  }
  tickEMOM() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 })
    } else if (this.state.roundsElapsed <= this.state.rounds) {
      this.setState({
        seconds: 60,
        roundsElapsed: this.state.roundsElapsed + 1,
      })
    } else {
      this.finished()
    }
  }
  playSound() {
    a.play()
  }
  finished() {
    this.playSound()
    if (this.state.playing) {
      this.togglePlay()
    }
  }
  shift(x, rounds, tab) {
    if (tab === 'Rest') {
      if (this.state.tabataRest + x <= 60 && this.state.tabataRest + x >= 10) {
        this.setState({ tabataRest: this.state.tabataRest + x })
      }
    } else if (tab === 'Work') {
      if (this.state.tabataWork + x <= 60 && this.state.tabataWork + x >= 10) {
        this.setState({ tabataWork: this.state.tabataWork + x })
      }
    } else if (rounds) {
      this.setState({
        rounds: this.state.rounds + x,
      })
    } else {
      this.setState({
        selectedTime: this.state.selectedTime + x,
      })
      if (!this.state.playing) {
        this.setState({
          seconds: this.state.seconds + x,
        })
      }
    }
  }
  shiftRounds(x) {
    if (this.state.rounds + x >= 1 && this.state.rounds + x <= 30) {
      this.setState({
        rounds: this.state.rounds + x,
      })
    }
  }
  reset() {
    if (this.state.playing) {
      this.togglePlay
    }
    if (this.state.isCountingUp) {
      this.setState({ seconds: 0 })
    } else if (this.state.mode === 'Tabata') {
      this.setState({ seconds: this.state.tabataWork })
    } else {
      this.setState({
        seconds: this.state.selectedTime,
        roundsElapsed: 0,
      })
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  switchMode(newMode) {
    if (this.state.playing) {
      this.togglePlay
    }
    const modeFunctions = {
      Timer: () => this.setTimer(),
      EMOM: () => this.setEMOM(),
      Tabata: () => this.setTabata(),
    }
    modeFunctions[newMode]()
    this.setState({
      mode: newMode,
      roundsElapsed: 0,
    })
  }
  /*
     The following three set functions set the initial conditions for each mode.
  */
  setTimer() {
    this.setState({
      selectedTime: 600,
      seconds: 600,
    })
  }
  setEMOM() {
    this.setState({
      selectedTime: 60,
      seconds: 60,
      isCountingUp: false,
    })
  }
  setTabata() {
    this.setState({
      selectedTime: this.state.tabataWork,
      seconds: 20,
      isCountingUp: false,
    })
  }
  render() {
    return (
      <div className="container">
        <Home
          totalSeconds={this.state.seconds}
          shift={(x, rounds, tab) => this.shift(x, rounds, tab)}
          shiftRounds={x => this.shiftRounds(x)}
          togglePlay={() => this.togglePlay()}
          playing={this.state.playing}
          reset={() => this.reset()}
          selection={this.state.isCountingUp}
          toggleDirection={() => this.toggleDirection()}
          isCountingUp={this.state.isCountingUp}
          selectedTime={this.state.selectedTime}
          switchMode={newMode => this.switchMode(newMode)}
          mode={this.state.mode}
          rounds={this.state.rounds}
          roundsElapsed={this.state.roundsElapsed}
          tabataWork={this.state.tabataWork}
          tabataRest={this.state.tabataRest}
          isWork={this.state.isWork}
        />
      </div>
    )
  }
}
