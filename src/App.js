import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board';
import DamageSelector from './damage_selector';
import SkillSelector from './skill_selector';

class App extends Component {

  constructor() {
    super();
    this.state = {
//      hitpoints: Array(9).fill(null),
      hitpoints: [18, 21, 18, 18, 21, 18, 18, 21, 18],
    };
  }

  handleClick(index, damage) {
    console.log(`${index}: ${damage}`);
    const hitpoints = this.state.hitpoints.slice(0);

    hitpoints[index] -= damage;
    this.setState(
      {
        hitpoints: hitpoints,
      }
    )
  }

  handleDamageSelectorChange(event) {
    console.log(event.target.value);
    this.setState(
      {
        damage: event.target.value,
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
          onClick={(i, d) => this.handleClick(i, d)} />
        <DamageSelector
          damages={[12, 13, 14, 15, 16, 17, 18]}
          damage={this.state.damage}
          onChange={(event) => this.handleDamageSelectorChange(event)} />
        <SkillSelector />
      </div>
    );
  }
}

export default App;
