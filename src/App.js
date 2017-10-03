import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board';
import DamageSelector from './damage_selector';
import SkillSelector from './skill_selector';
import PowerSelector from './power_selector';
//import SC from './sewing_calculator';

class App extends Component {

  constructor() {
    super();
    this.state = {
      skills: [
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
      ],
      hitpoints: [18, 21, 18, 18, 21, 18, 18, 21, 18],
      powers: [
        {
          display: "弱い",
          rate: 0.5,
        },
        {
          display: "普通",
          rate: 1.0,
        },
        {
          display: "強い",
          rate: 1.5,
        },
        {
          display: "最強",
          rate: 2.0,
        },
      ],
      power: 0,
      skill: '',
      damage: '',
    };
  }

  handleClickSquare(index, damage) {
    console.log(`${index}: ${damage}`);
    const hitpoints = this.state.hitpoints.slice(0);

    hitpoints[index] -= this.state.damage;
    this.setState(
      {
        hitpoints: hitpoints,
      }
    )
  }

  handleChangeDamage(event) {
    console.log(event.target.value);
    this.setState(
      {
        damage: event.target.value,
      }
    );
  }

  handleChangeSkill(event) {
    this.setState(
      {
        skill: event.target.value,
      }
    );
  }

  handleChangePower(event) {
    this.setState(
      {
        power: event.target.value,
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board
          hitpoints={this.state.hitpoints}
          onClick={(i) => this.handleClickSquare(i)} />
        <DamageSelector
          damages={[12, 13, 14, 15, 16, 17, 18]}
          damage={this.state.damage}
          onChange={(event) => this.handleChangeDamage(event)} />
        <SkillSelector
          skills={this.state.skills}
          skill={this.state.skill}
          onChange={(event) => this.handleChangeSkill(event)} />
        <PowerSelector
          powers={this.state.powers}
          power={this.state.power}
          onChange={(event) => this.handleChangePower(event)} />
      </div>
    );
  }
}

export default App;
