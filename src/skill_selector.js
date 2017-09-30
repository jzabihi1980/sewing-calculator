import React from 'react';

export default class SkillSelector extends React.PureComponent {

  renderRadios() {
    const skills = this.props.skills.slice(0);
    const options = [];
    for (let i = 0; i < skills.length; i++) {
//      console.log(`state.value: ${this.props.value} i: ${i} bool: ${this.props.skill === i.toString()} ${typeof Number.toString(i)} ${typeof this.props.skill}`);
      options.push(
        <label key={i}>
          <input
            type="radio" name="skill"
            value={i}
            checked={this.props.skill === i.toString()}
            onChange={this.props.onChange} /> {skills[i].name}
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