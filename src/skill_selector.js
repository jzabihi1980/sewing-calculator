import React from 'react';

export default class SkillSelector extends React.PureComponent {

  renderRadios() {
    const skills = this.props.skills.slice(0);
    const options = [];
    for (let i = 0; i < skills.length; i++) {
      options.push(
        <label key={i}>
          <input
            type="radio" name="skill"
            value={i}
            checked={this.props.skill === i}
            onChange={this.props.onChange} /> {skills[i].display}
        </label>
      );
    }

    return options;
  }

  render() {
    return (
      <div className="skillSelector">
        {this.renderRadios()}
      </div>
    );
  }
}