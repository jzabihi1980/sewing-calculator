import React from 'react';

export default class SkillSelector extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }
  }

  handleChange(event) {
//    console.log(`selected: ${event.target.value}`);
    this.setState(
      {
        value: event.target.value,
      }
    );
  }

  renderRadios() {
    const skills = [
      {
        id: 0,
        name: '滝', 
        move: [0, 3],
        rate: 1.0,
      },
      {
        id: 1,
        name: '横',
        move: [0, 1],
        rate: 1.0,
      },
      {
        id: 2,
        name: '大滝',
        move:[0, 3, 6],
        rate: 1.0,
      },
      {
        id: 3,
        name: '水平',
        move: [0, 1, 2],
        rate: 1.0,
      },
      {
        id: 4,
        name: '2倍',
        move: [0],
        rate: 2.0,
      },
      {
        id: 5,
        name: '3倍',
        move: [0],
        rate: 3.0
      },
    ];
  
    const options = [];
    for (let i = 0; i < skills.length; i++) {
      console.log(`state.value: ${this.state.value} i: ${i} bool: ${this.state.value === i.toString()} ${typeof Number.toString(i)} ${typeof this.state.value}`);
      options.push(
        <label key={i}>
          <input
            type="radio" name="skill"
            value={i}
            checked={this.state.value === i.toString()}
            onChange={(event) => this.handleChange(event)} /> {skills[i].name}
        </label>
      );
    }

    return options;
  }

  render() {
    console.log(this.state.value);
    return (
      <div className="skillSelector">
        hoge
        {this.renderRadios()}
      </div>
    );
  }
}