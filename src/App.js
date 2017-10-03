import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board';
import DamageSelector from './damage_selector';
import SkillSelector from './skill_selector';
import PowerSelector from './power_selector';

class App extends Component {

  constructor() {
    super();
    this.baseDamages = [12, 13, 14, 15, 16, 17, 18];
    this.state = {
      damage: undefined,
      damages: this.baseDamages,
      skill: 0,
      skills: [
        {
          display: '縫う',
          move: [0],
          rate: 1.0,
        },
        {
          display: '滝', 
          move: [0, 3],
          rate: 1.0,
        },
        {
          display: '横',
          move: [0, 1],
          rate: 1.0,
        },
        {
          display: '大滝',
          move:[0, 3, 6],
          rate: 1.0,
        },
        {
          display: '水平',
          move: [0, 1, 2],
          rate: 1.0,
        },
        {
          display: '2倍',
          move: [0],
          rate: 2.0,
        },
        {
          display: '3倍',
          move: [0],
          rate: 3.0
        },
        {
          display: 'ほぐし',
          move: [0],
          rate: -0.5,
        }
      ],
      hitpoints: [18, 21, 18, 18, 21, 18, 18, 21, 18],
      power: 1,
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

  calculateDamages(skillRate, powerRate) {
    return (
      this.baseDamages.map(
        (damage) => Math.ceil(damage * skillRate * powerRate)
      ).filter(
      (v, i, self) => self.indexOf(v) === i
      )
    );
  }

  handleChangeSkill(event) {
    this.setState(
      {
        skill: Number.parseInt(event.target.value, 10),
        damages: this.calculateDamages(
          this.state.skills[event.target.value].rate,
          this.state.powers[this.state.power].rate),
      }
    );
  }

  handleChangePower(event) {
    this.setState(
      {
        power: event.target.value,
        damages: this.calculateDamages(
          this.state.skills[this.state.skill].rate,
          this.state.powers[event.target.value].rate),
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
          damages={this.state.damages}
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
