import React from 'react';

export default class PowerSelector extends React.PureComponent {

  renderOptions() {
    const powers = this.props.powers.slice(0);
    const options = [];
    for (let i = 0; i < powers.length; i++) {
      options.push(
        <option key={i} value={i}>{powers[i].display}</option>
       );
    }
    return options;
  }

  render() {
    return (
      <select value={this.props.power} onChange={this.props.onChange}>
        {this.renderOptions()}
      </select>
    );
  }
}