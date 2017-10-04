import React from 'react';

export default class DamageSelector extends React.Component {

  renderOptions() {
    const damages = this.props.damages.slice(0);
    const options = [];
    for (let i = 0; i < damages.length; i++) {
      options.push(
        <option
          key={i}
          value={damages[i]}>{damages[i]}</option>
      );
    }
    return options;
  }

  render() {
    return (
      <div>
        <select value={this.props.damage} onChange={this.props.onChange} size="7">
        {
          this.renderOptions()
        }
        </select>
      </div>
    );
  }
}