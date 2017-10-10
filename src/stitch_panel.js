import React from 'react';

export default class StitchPanel extends React.Component {

  constructor(props) {
    super(props);
    this.baseStitches = [12, 13, 14, 15, 16, 17, 18];
    this.stitches = this.baseStitches;
    this.state = {
      stitchCount: this.props.stitchCount,
      square: this.props.square,
      skill: this.props.skill,
      power: this.props.power,
      isCritical: false,
    };
  }

  calculateStitches(nextState) {
    const base = this.baseStitches.slice(0);
    const skillRate = nextState.skill.rate;
    const powerRate = nextState.power.rate;

    console.log(`calculateStitches skill:${skillRate} power:${powerRate} critical: ${this.state.isCritical}`);

    if (nextState.isCritical) {
      const max = base[base.length - 1] * skillRate * powerRate * 2;
      this.stitches = [];
      for (let i = 0; i < max; i++) {
        this.stitches.push(i + 1);
      }
    } else {
      this.stitches = base.map(
        (stitch) => Math.ceil(stitch * skillRate * powerRate)
      ).filter(
        (v, i, self) => self.indexOf(v) === i
      );
    }
  }

  renderStitches() {
    const stitches = this.stitches.slice(0);
    const buttons = [];
    for (let i = 0; i < stitches.length; i++) {
      buttons.push(
        <button
          id={`stitch${i}`} key={i}
          className="stitch_choice"
          onClick={(event) => {this.handleClickStitch(event)}}
          value={stitches[i]}>{stitches[i]}</button>
      );
    }
    return buttons;
  }

  handleClickStitch(event) {
    this.setState({isCritical: false});
    this.props.onClickStitch(event.target.value);
  }

  handleClickCritical() {
    if (this.state.square.hitpoint <= this.stitches[0] * 2) {
      this.props.onClickStitch(this.state.square.hitpoint);
    } else {
      this.setState({isCritical: !this.state.isCritical});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stitchCount: nextProps.stitchCount,
      square: nextProps.square,
      skill: nextProps.skill,
      power: nextProps.power,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    this.calculateStitches(nextState);
  }

  componentDidUpdate() {
    document.getElementById('critical_switch').disabled =
      !this.state.skill.isCriticalEnabled;
  }

  render() {
    return (
      <div id="stitch_panel">
        <div id="stitch_indicator"><span id="stitch_count">{this.props.stitchCount}</span> 針目</div>
        <ul id="status_indicator">
          <li>現在のマス: {this.state.square.hitpoint}</li>
          <li>つよさ: {this.state.power.display}</li>
          <li>とくぎ: {this.state.skill.display}</li>
        </ul>
        <div id="stitch_selector">
          {this.renderStitches()}
        </div>
        <button
          id="critical_switch"
          onClick={() => {this.handleClickCritical()}}>CRIT</button>
      </div>
    );
  }
}