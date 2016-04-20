var React = require('react');
var Home = require('../components/Home');

var HomeContainer = React.createClass({
  getInitialState: function() {
    return {
      seconds: 600,
      playing: false,
      countDirection: false, // false is count down and true is count up
      selectedTime: 600,
      rounds: 10,
      mode: "Timer",
      roundsElapsed: 0,
      tabataWork: 20,
      tabataRest: 10,
      tabataMode: true // true for 'work' and false for 'rest'
    };
  },
  togglePlay: function() {
    this.setState({
      playing: !this.state.playing
    });
  },
  toggleDirection: function() {
    this.setState(
      {
        countDirection: !this.state.countDirection
      });
    if(!this.state.countDirection) {
      this.setState({seconds: 0});
    } else {
      this.setState({seconds: this.state.selectedTime});
    }
  },
  tick: function() {
    var ticks = {
      Timer: this.tickTimer,
      EMOM: this.tickEMOM,
      Tabata: this.tickTabata
    };

    if(this.state.playing) {
      ticks[this.state.mode]();
    }
  },
  // The following three tick functions establish the logic for rounds, end conditions, etc.
  tickTimer: function() {
      if(this.state.seconds > 0 && !this.state.countDirection) {
        this.setState({seconds: this.state.seconds - 1});
      } else if(this.state.seconds < this.state.selectedTime && this.state.countDirection) {
        this.setState({seconds: this.state.seconds + 1});
      } else {
        this.finished();
      }
  },
  tickTabata: function() {
    if(this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1});
    } else if (this.state.rounds === this.state.roundsElapsed) {
      this.finished();
    } else {
      this.setState({tabataMode: !this.state.tabataMode});
      if(this.state.tabataMode) {
        this.setState({
          seconds: this.state.tabataWork,
          roundsElapsed: this.state.roundsElapsed + 1});
      } else {
        this.setState({
          seconds: this.state.tabataRest
        });
      
      }
    }
  },
  tickEMOM: function() {
    if(this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1});
    } else if(this.state.roundsElapsed <= this.state.rounds) {
      this.setState({
        seconds: 60,
        roundsElapsed: this.state.roundsElapsed + 1});
    } else {
      this.finished();
    }
  },
  finished: function() {
    console.log("***Finished***");
    if(this.state.playing){this.togglePlay()};
  },
  shift: function(x, rounds, tab) {
    if (tab === "Rest" && this.state.tabataRest < 60) {
      this.setState({ tabataRest: this.state.tabataRest + x });
    } else if (tab === "Work" && this.state.tabataWork < 60) {
      this.setState({ tabataWork: this.state.tabataWork + x });
    } else if (rounds) {
        this.setState({
          rounds: this.state.rounds + (x)
        });
    } else {
        this.setState({
          selectedTime: this.state.selectedTime + (x)
        });      
    }
  },
  timeString: function(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var timeString = ('0' + minutes).slice(-2) + " : " + ('0' + seconds).slice(-2);
    return timeString;
  },
  reset: function() {
    if (this.state.playing){this.togglePlay()};
    if (this.state.countDirection) {
      this.setState({seconds: 0});
    } else if (this.state.mode === "Tabata") {
      this.setState({seconds: this.state.tabataWork});
    } else {
      this.setState({
        seconds: this.state.selectedTime,
        roundsElapsed: 0
      });
    }
  },
  componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  switchMode: function(newMode) {
    if(this.state.playing){this.togglePlay()};
    var modeFunctions = {
      Timer: this.setTimer,
      EMOM: this.setEMOM,
      Tabata: this.setTabata
    };
    modeFunctions[newMode]();
    this.setState({
      mode: newMode
    });    
  },
  /*
     The following three set functions set the initial conditions for each mode.
  */
  setTimer: function() {
    this.setState({
      selectedTime: 600,
      seconds: 600
    })
  },
  setEMOM: function() {
    this.setState({
      selectedTime: 60,
      seconds: 60,
      countDirection: false
    })
  },
  setTabata: function() {
    this.setState({
      selectedTime: this.state.tabataWork,
      seconds: 20,
      countDirection: false
    })
  },
  render: function() {
    return (
      <div className="container">
        <Home
          timeString={this.timeString}
          seconds={this.state.seconds}
          shift={this.shift} 
          togglePlay={this.togglePlay} 
          playing={this.state.playing} 
          reset={this.reset}
          selection={this.state.countDirection} 
          toggleDirection={this.toggleDirection}
          countDirection={this.state.countDirection} 
          selectedTime={this.state.selectedTime}
          switchMode={this.switchMode}
          mode={this.state.mode} 
          rounds={this.state.rounds} 
          roundsElapsed={this.state.roundsElapsed} 
          tabataWork={this.state.tabataWork} 
          tabataRest={this.state.tabataRest} 
          tabataMode={this.state.tabataMode}
          />
      </div>
    );
  }
});

module.exports = HomeContainer;