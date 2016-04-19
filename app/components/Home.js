var React = require('react');

var Play = (props) => {
    var className = "btn play glyphicon glyphicon-" + (props.playing ? "pause" : "play");
  return (
    <button id="play" className={className} onClick={props.togglePlay}></button>
  );
}

var Refresh = (props) => {
  return (
    <button id="reset" className="btn reset glyphicon glyphicon-refresh" onClick={props.reset}></button>
  );
}

var ToggleCount = (props) => {
    var className = "btn up glyphicon glyphicon-chevron-" + (props.countDirection ? "up" : "down");
  return (
    <button className={className} onClick={props.toggleDirection}></button>
  );
}

var SelectFrame = (props) => {
  var display = 0;
  if (props.roundMode) {
    display = props.currentValue;
  } else if (props.tabata) {
    display = ":" + props.currentValue;
  } else {
    display = Math.floor(props.currentValue / 60);
  }
  return (
    <div className="selectContainer">
      {props.title && <div>{props.title}</div>}
      <div className="select">
        <button id="minus" className="btn glyphicon glyphicon-minus" onClick={props.shift.bind(this, -props.delta,  props.roundMode, props.title)}></button>
        <div className="currentlySelected"> {display} </div>
        <button id="plus" className="btn glyphicon glyphicon-plus" onClick={props.shift.bind(this, props.delta, props.roundMode, props.title)}></button>
      </div>
    </div>);
}

var RoundsElapsed = (props) => {
  return (
    <div className="elapsed">
      <div>Rounds Completed</div> 
      <div className="currentlySelected">{props.roundsElapsed}</div>
    </div>)
}

var TabataControls = (props) => {
  return (
    <div>
      <SelectFrame 
        shift={props.shift} 
        currentValue={props.tabataWork}
        tabata={true} 
        delta={10}
        title="Work" />
      <SelectFrame 
        shift={props.shift} 
        tabata={true} 
        currentValue={props.tabataRest}
        delta={10}
        title="Rest" />
    </div>
  )
}

var Rounds = (props) => {
  return (
    <div className="rounds">
      <SelectFrame 
        shift={props.shift} 
        currentValue={props.rounds} 
        roundMode={true} 
        delta={1}
        title="Rounds" />
      <RoundsElapsed roundsElapsed={props.roundsElapsed}/>
    </div>
  )
}

var Menu = (props) => {
  return (
    <div className="menu">
      <div id="timer" className="timer" onClick={props.switchMode.bind(this, "Timer")}>Timer</div>
      <div id="tabata" className="tabata" onClick={props.switchMode.bind(this, "Tabata")}>Tabata</div>
      <div id="emom" className="emom" onClick={props.switchMode.bind(this, "EMOM")}>EMOM</div>
    </div>);
}

var UI = (props) => {
  // Add animation class when timer is at 5 seconds or less
  var tattlerClass = "tattler " + ((props.seconds <= 5 && props.playing) ? "alertAnimation" : "");
  return (
    <div className="container">
        <Menu switchMode={props.switchMode} mode={props.mode} />
        <div className="main">
          <div className={tattlerClass}>{props.timeString(props.seconds)}</div>
          <div className="controls">
            <div className="controlsContainer">
              {props.mode==="Tabata" && <TabataControls 
                                          tabataWork={props.tabataWork} 
                                          tabataRest={props.tabataRest} 
                                          shift={props.shift} />}
              {props.mode==="Timer" && <SelectFrame 
                                        shift={props.shift} 
                                        currentValue={props.selectedTime} 
                                        delta={60} 
                                        title="Minutes" />}
              {props.mode!=="Timer" && <Rounds 
                                         shift={props.shift}
                                         rounds={props.rounds}
                                         roundsElapsed={props.roundsElapsed} />}
            </div>
            <div className="timerControls">
              <Play togglePlay={props.togglePlay} playing={props.playing} />
              <Refresh reset={props.reset}/>
              {props.mode==="Timer" && <ToggleCount 
                                         countDirection={props.countDirection} 
                                         toggleDirection={props.toggleDirection}/>}
            </div> 
          </div>
        </div>
      </div>
  )
}

var Home = React.createClass({
  getInitialState: function() {
    return {
      seconds: 600,
      playing: false,
      // false is count down and true is count up
      countDirection: false,
      selectedTime: 600,
      rounds: 10,
      mode: "Timer",
      roundsElapsed: 0,
      tabataWork: 20,
      tabataRest: 10,
      // true for 'work' and false for 'rest'
      tabataMode: true
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
      // instead of 600 it should be set to whatever the select frame shows
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
    //console.log(this.state.mode);
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
  // the following three set functions set the initial conditions for each mode
  // including the initial time and UI changes
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
    console.log("Tabata");
    this.setState({
      selectedTime: this.state.tabataWork,
      seconds: 20,
      countDirection: false
    })
  },
  render: function() {
    return (
      <div className="container">
        <UI 
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


module.exports = Home;