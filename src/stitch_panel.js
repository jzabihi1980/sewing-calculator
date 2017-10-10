import React from 'react';

export default class StitchPanel extends React.Component {

  renderStitches() {
    const stitches = this.props.stitches.slice(0);
    const buttons = [];
    for (let i = 0; i < stitches.length; i++) {
      buttons.push(
        <button
          id={`stitch${i}`} key={i}
          className="stitch_choice"
          onClick={this.props.onSelectStitch}
          value={stitches[i]}>{stitches[i]}</button>
      );
    }
    return buttons;
  }

  render() {
    return (
      <div id="stitch_panel">
        <div id="stitch_indicator"><span id="stitch_count">{this.props.stitchCount}</span> 針目</div>
        <div id="stitch_selector">
          {this.renderStitches()}
        </div>
        <button
          id="critical_switch"
          onClick={this.props.onToggleCritical}>CRIT</button>
      </div>
    );
  }
}