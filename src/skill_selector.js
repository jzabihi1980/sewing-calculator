import React from 'react';

export default class SkillSelector extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      skills: [
        {
          id: 100,
          display: '縫う',
          rate: 1.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          id: 110,
          display: '滝', 
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          id: 120,
          display: '横',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          id: 130,
          display: '大滝',
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 3,
          },
          isCriticalEnabled: true,
        },
        {
          id: 140,
          display: '水平',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 3,
          },
          isCriticalEnabled: true,
        },
        {
          id: 150,
          display: 'たすき',
          rate: 1.0,
          move: {
            x: 1,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          id: 160,
          display: '逆たすき',
          rate: 1.0,
          move: {
            x: -1,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          id: 170,
          display: '2倍',
          rate: 2.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          id: 180,
          display: '3倍',
          rate: 3.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          id: 190,
          display: 'かげん',
          rate: 0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          id: 200,
          display: 'ほぐし',
          rate: -0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: false,
        }
      ],
      selected: this.state.skills[0].id,
    };
  }

  handleChange(event) {
    this.props.onChange(this.state.skills[event.target.value]);
  }

  renderRadios() {
    const skills = this.state.skills.slice(0);
    const options = [];
    for (let skill of skills) {
      options.push(
        <label key={skill.id}>
          <input
            type="radio" name="skill"
            value={skill.id}
            checked={this.state.selected === skill.id}
            onChange={(event) => this.handleChange(event)} /> {skill.display}
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