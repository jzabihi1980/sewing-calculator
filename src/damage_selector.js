import React from 'react';

export default class DamageSelector extends React.Component {

  renderOptions() {
    const damages = this.props.damages.slice(0);
    const options = [];
    for (let damage of damages) {
      options.push(<option key={damage.toString()} value={damage}>{damage}</option>);
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