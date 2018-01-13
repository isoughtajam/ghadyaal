import React from 'react';
const moment = require('moment');

export default class Ghadyaal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
    };
  }

  /**
   * Increments time as the component's state
   */
  tick() {
    this.setState({
      now: this.state.now.add(1, 'seconds')
    });
  }

  /**
   * Set the component to call tick() every second
   */
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Calculate svg line coordinates for a line numeral based on an integer
   */
  getCoordinates(timeInt) {
    const tensCoords = {
      0: [],
      1: [[0, this.props.numeralSize, this.props.numeralSize, 0, 0.5]],
      2: [[0, 0, this.props.numeralSize, this.props.numeralSize, 0.5]],
      3: [[0, this.props.numeralSize, this.props.numeralSize, 0, 0.5], [0, 0, this.props.numeralSize, this.props.numeralSize, 0.5]]
    }

    const swCoords = {
      0: [],
      1: [[0, this.props.numeralSize, this.props.numeralSize, this.props.numeralSize, 1]],
      2: [[0, 0, 0, this.props.numeralSize, 1]],
      3: [[0, this.props.numeralSize, this.props.numeralSize, this.props.numeralSize, 1], [0, 0, 0, this.props.numeralSize, 1]]
    }

    const neCoords = {
      0: [],
      1: [[this.props.numeralSize, 0, this.props.numeralSize, this.props.numeralSize, 1]],
      2: [[0, 0, this.props.numeralSize, 0, 1]],
      3: [[this.props.numeralSize, 0, this.props.numeralSize, this.props.numeralSize, 1], [0, 0, this.props.numeralSize, 0, 1]]
    }
    const tens = Math.floor(timeInt / 16);
    const sw = timeInt % 16 % 4;
    const ne = Math.floor((timeInt % 16)/4);
    return tensCoords[tens].concat(swCoords[sw], neCoords[ne]);
  }

  /**
   * Create line tags for an array of coordinates
   */
  createLines(coordinates) {
    var lineStyle = {
      stroke: "black"
    }

    return coordinates.map((coordinate) => 
      <line className="line"
        key={this.state.now + "_" + Math.random().toString()}
        x1={coordinate[0].toString()}
        y1={coordinate[1].toString()}
        x2={coordinate[2].toString()}
        y2={coordinate[3].toString()}
        style={{
          strokeWidth: coordinate[4] * this.props.baseStrokeWidth,
          stroke: "black"
        }}
      />
    )
  }

  render() {
    const secondsLines = this.createLines(
      this.getCoordinates(this.state.now.seconds()));
    const minutesLines = this.createLines(
      this.getCoordinates(this.state.now.minutes()));
    const hoursLines = this.createLines(
      this.getCoordinates(this.state.now.hours()));

    var timersStyle = {
      backgroundColor: "white",
      width: this.props.numeralSize * 3 + 30
    }
    var timerStyle = {
      margin: 5,
    }
    return (
      <div id="timers" style={timersStyle}>
        <svg id="hours" className="timer"
          style={timerStyle}
          height={this.props.numeralSize}
          width={this.props.numeralSize}>
          {hoursLines}
        </svg>
        <svg id="minutes" className="timer"
          style={timerStyle}
          height={this.props.numeralSize}
          width={this.props.numeralSize}>
          {minutesLines}
        </svg>
        <svg id="seconds" className="timer"
          style={timerStyle}
          height={this.props.numeralSize}
          width={this.props.numeralSize}>
          {secondsLines}
        </svg>
      </div>
    );
  }
};

Ghadyaal.defaultProps = {
  numeralSize: 30,
  baseStrokeWidth: 4
};
