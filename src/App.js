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
      damage: 0,
      damages: this.baseDamages,
      skill: 0,
      skills: [
        {
          display: '縫う',
          rate: 1.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
        },
        {
          display: '滝', 
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 2,
          },
        },
        {
          display: '横',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 2,
          },
        },
        {
          display: '大滝',
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 3,
          },
        },
        {
          display: '水平',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 3,
          },
        },
        {
          display: 'たすき',
          rate: 1.0,
          move: {
            x: 1,
            y: 1,
            count: 2,
          },
        },
        {
          display: '逆たすき',
          rate: 1.0,
          move: {
            x: -1,
            y: 1,
            count: 2,
          },
        },
        {
          display: '2倍',
          rate: 2.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
        },
        {
          display: '3倍',
          rate: 3.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
        },
        {
          display: 'かげん',
          rate: 0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
        },
        {
          display: 'ほぐし',
          rate: -0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
        }
      ],
      hitpoints: [
        [18, 21, 18],
        [21, 22, 23],
        [18, 19, 20],
      ],
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

  isValidSquare(x, y) {
    const skill = this.state.skills[this.state.skill];

    // calculate position that most far square.
    const moveX = x + (skill.move.x * (skill.move.count - 1));
    const moveY = y + (skill.move.y * (skill.move.count - 1));

    console.log(skill.display);
    console.log(`x: ${x} y: ${y}`);
    console.log(`most far X: ${moveX} y: ${moveY}`);

    return (
      moveX >= 0 && moveY >= 0 &&
      moveX < this.state.hitpoints.length &&
      moveY < this.state.hitpoints[moveX].length
    );
  }

  handleOverSquare(event, x, y) {
    const bgColor = (this.isValidSquare(x, y)) ? '#88f' : '#f88';
    event.target.style = {
      backgroundColor: bgColor,
    };
  }

  handleClickSquare(x, y) {
    if (!this.isValidSquare(x, y)) {
      console.log(`square position is invalid.`);
      return;
    }
    console.log(`square position is valid.`);

    console.log(
      `pos: ${x}, ${y} ` +
      `power: ${this.state.powers[this.state.power].display} ` +
      `skill: ${this.state.skills[this.state.skill].display} ` +
      `damage: ${this.state.damage}`);
    const hitpoints = this.state.hitpoints.slice(0);

    hitpoints[x][y] -= this.state.damage;
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
          onClick={(x, y) => this.handleClickSquare(x, y)} 
          onMouseOver={(event, x, y) => this.handleOverSquare(event, x, y)} />
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
