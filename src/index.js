import React from 'react';
require('datejs');

/**
 * A few constants to tinker with
 */
const size = 30;
const baseStrokeWidth = 4;

/**
 * A few constants YOU SHOULD NOT tinker with
 */
const tensLines = {
  0: [],
  1: [[0, size, size, 0, 0.5]],
  2: [[0, 0, size, size, 0.5]],
  3: [[0, size, size, 0, 0.5], [0, 0, size, size, 0.5]]
}

const unitsLines = {
  0: [],
  1: [[0, size, size, size, 1]],
  2: [[0, 0, 0, size, 1]],
  3: [[0, size, size, size, 1], [0, 0, 0, size, 1]],
  4: [[size, 0, size, size, 1]],
  5: [[0, size, size, size, 1], [size, 0, size, size, 1]],
  6: [[0, 0, 0, size, 1], [size, 0, size, size, 1]],
  7: [[0, size, size, size, 1], [0, 0, 0, size, 1], [size, 0, size, size, 1]],
  8: [[0, 0, size, 0, 1]],
  9: [[0, size, size, size, 1], [0, 0, size, 0, 1]],
  10: [[0, 0, 0, size, 1], [0, 0, size, 0, 1]],
  11: [[0, size, size, size, 1], [0, 0, 0, size, 1], [0, 0, size, 0, 1]],
  12: [[size, 0, size, size, 1], [0, 0, size, 0, 1]],
  13: [[size, 0, size, size, 1], [0, size, size, size, 1], [0, 0, size, 0, 1]],
  14: [[size, 0, size, size, 1], [0, 0, 0, size, 1], [0, 0, size, 0, 1]],
  15: [[size, 0, size, size, 1], [0, size, size, size, 1], [0, 0, 0, size, 1], [0, 0, size, 0, 1]]
}

export default class Ghadyaal extends React.Component {
  constructor(props) {
    super(props);
    var now = new Date();
    this.state = {
      now: new Date(),
    };
  }

  /**
   * Increments time as the component's state
   */
  tick() {
    console.log(
      this.state.now.getHours() + ":" +
      this.state.now.getMinutes() + ":" +
      this.state.now.getSeconds());
    this.setState({
      now: this.state.now.add({seconds: 1})
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
    const tens = Math.floor(timeInt / 16);
    const units = timeInt % 16;
    return tensLines[tens].concat(unitsLines[units]);
  }

  /**
   * Create line tags for an array of coordinates
   */
  createLines(coordinates) {
    return coordinates.map((coordinate) => 
      <line className="lines"
        key={this.state.now + "_" + Math.random().toString()}
        x1={coordinate[0].toString()}
        y1={coordinate[1].toString()}
        x2={coordinate[2].toString()}
        y2={coordinate[3].toString()}
        style={{strokeWidth: coordinate[4] * baseStrokeWidth}}
      />
    )
  }

  render() {
    const secondsLines = this.createLines(
      this.getCoordinates(this.state.now.getSeconds()));
    const minutesLines = this.createLines(
      this.getCoordinates(this.state.now.getMinutes()));
    const hoursLines = this.createLines(
      this.getCoordinates(this.state.now.getHours()));

    return (
      <div id="timers">
        <svg id="hours" className="timer" height={size} width={size}>
          {hoursLines}
        </svg>
        <svg id="minutes" className="timer" height={size} width={size}>
          {minutesLines}
        </svg>
        <svg id="seconds" className="timer" height={size} width={size}>
          {secondsLines}
        </svg>
      </div>
    );
  }
};