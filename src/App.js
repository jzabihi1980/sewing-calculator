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
      moves: [],
      damage: 3,
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
      squares: [
        [
          {
            hitpoint: 18,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 20,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 22,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
        [
          {
            hitpoint: 24,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 26,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 28,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
        [
          {
            hitpoint: 30,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 32,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 34,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
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
      moveX < this.state.squares.length &&
      moveY < this.state.squares[moveX].length
    );
  }

  calculateMoves(x, y) {
    const skill = this.state.skills[this.state.skill];
    const moves = [];

    for (let i = 0; i < skill.move.count; i++) {
      const moveX = x + (skill.move.x * i);
      const moveY = y + (skill.move.y * i);
      moves.push({x: moveX, y:moveY});
    }

    return moves;
  }

  handleOverSquare(x, y) {
    if (! this.isValidSquare(x, y)) {
      return;
    }

    const squares = this.state.squares.slice(0);
    const moves = this.calculateMoves(x, y);

    for (let i = 0; i < moves.length; i++) {
      squares[moves[i].x][moves[i].y].bgCol = '#bdf';
    }

    this.setState(
      {
        squares: squares,
      }
    );
  }

  handleOutSquare(x, y) {
    const squares = this.state.squares.slice(0);
    this.setState(
      {
        squares: squares.map((cols) => {
          return cols.map((square) => {
            square.bgCol = square.defBgCol;
            return square;
          })
        }),
      }
    )
  }

  sewSquare(x, y, damage) {
    console.log(
      `pos: ${x}, ${y} ` +
      `power: ${this.state.powers[this.state.power].display} ` +
      `skill: ${this.state.skills[this.state.skill].display} ` +
      `damage: ${damage}`);
    const squares = this.state.squares.slice(0);

    squares[x][y].hitpoint -= damage;

    squares[x][y].fgCol =
      (squares[x][y].hitpoint === 0) ? '#0b0' :
      (squares[x][y].hitpoint >= -4 && squares[x][y].hitpoint <= 4) ? '#c80' :
      (squares[x][y].hitpoint < -5) ? '#d00' : '#222';

    this.setState(
      {
        squares: squares,
      }
    )
 
  }

  handleClickSquare(x, y) {
    if (!this.isValidSquare(x, y)) {
      console.log(`square position is invalid.`);
      return;
    }
    console.log(`square position is valid.`);

    this.setState(
      {
        moves: this.calculateMoves(x, y),
      }
    );

    document.getElementById('damage_selector').style.display = 'block';
    /*
    console.log(
      `pos: ${x}, ${y} ` +
      `power: ${this.state.powers[this.state.power].display} ` +
      `skill: ${this.state.skills[this.state.skill].display} ` +
      `damage: ${this.state.damage}`);
    const squares = this.state.squares.slice(0);

    squares[x][y].hitpoint -= this.state.damage;

    squares[x][y].fgCol =
      (squares[x][y].hitpoint === 0) ? '#0b0' :
      (squares[x][y].hitpoint >= -4 && squares[x][y].hitpoint <= 4) ? '#c80' :
      (squares[x][y].hitpoint < -5) ? '#d00' : '#222';

    this.setState(
      {
        squares: squares,
      }
    )
    */
  }

  handleChangeDamage(event) {
    console.log(event.target.value);
    console.log(this.state.moves);
    const moves = this.state.moves.slice(0);
    const move = moves.shift();

    this.sewSquare(move.x, move.y, event.target.value);
    this.setState(
      {
        moves: moves,
        damage: event.target.value,
      }
    );

    document.getElementById('damage_selector').style.display = 'none';
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
          squares={this.state.squares}
          onClick={(x, y) => this.handleClickSquare(x, y)} 
          onMouseOver={(x, y) => this.handleOverSquare(x, y)}
          onMouseOut={(x, y) => this.handleOutSquare(x, y)} />
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
