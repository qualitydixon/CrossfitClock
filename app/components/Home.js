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
        <button id="minus" className="btn glyphicon glyphicon-minus" onClick={props.shift.bind(null, -props.delta,  props.roundMode, props.title)}></button>
        <div className="currentlySelected"> {display} </div>
        <button id="plus" className="btn glyphicon glyphicon-plus" onClick={props.shift.bind(null, props.delta, props.roundMode, props.title)}></button>
      </div>
    </div>);
}

var RoundsElapsed = (props) => {
  return (
    <div className="elapsed">
      <div>Completed</div> 
      <div className="currentlySelected">{props.roundsElapsed}</div>
    </div>)
}

var TabataControls = (props) => {
  return (
    <div style={{marginRight: 20 + 'px'}}>
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
    <div>
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
      <div id="timer" className="timer" onClick={props.switchMode.bind(null, "Timer")}>Timer</div>
      <div id="tabata" className="tabata" onClick={props.switchMode.bind(null, "Tabata")}>Tabata</div>
      <div id="emom" className="emom" onClick={props.switchMode.bind(null, "EMOM")}>EMOM</div>
    </div>);
}

var Home = (props) => {
  // Add animation class when timer is at 5 seconds or less
  var tattlerClass = "tattler " + ((props.seconds <= 5 && props.playing) ? "alertAnimation" : "");
  return (
    <div>
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
  );
};

module.exports = Home;